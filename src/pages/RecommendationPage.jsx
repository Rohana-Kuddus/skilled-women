import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useLocation } from "react-router-dom";
import { getClass } from "../redux/slices/courseSlice";
import { useCookies } from "react-cookie";
import { getJobList } from "../redux/slices/jobSlice";
import { getRoadmap } from "../redux/slices/roadmapSlice";

function RecommendationPage() {
  const dispatch = useDispatch();
  const { status, name } = useSelector(state => state.alert);
  const { courseDetail } = useSelector(state => state.course);
  const { job } = useSelector(state => state.job);
  const { roadmap } = useSelector(state => state.roadmap);
  const [cookies] = useCookies();

  // check edit page or add new course
  const location = useLocation();
  if (location.state !== null) {
    const { classId } = location.state;

    useEffect(() => {
      dispatch(getClass(cookies.token, classId));
    }, [courseDetail]);
  };

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getJobList());
  }, []);

  // input states
  const [search, setSearch] = useState(Object.keys(courseDetail).length !== 0 ? courseDetail.job : '');
  const [select, setSelect] = useState(Object.keys(courseDetail).length !== 0 ? courseDetail.roadmap : []);
  const [payment, setPayment] = useState({
    status: 'paid',
    paidChecked: true,
    freeChecked: false
  });
  const [input, setInput] = useState({
    job: courseDetail ? courseDetail.job : '',
    roadmap: courseDetail ? courseDetail.roadmap : [],
    name: courseDetail ? courseDetail.name : '',
    link: courseDetail ? courseDetail.link : '',
    status: courseDetail ? courseDetail.paid : true,
    description: courseDetail ? courseDetail.description : ''
  });
  const [error, setError] = useState({
    job: '',
    roadmap: '',
    name: '',
    status: '',
    description: ''
  });

  const alert = {
    status: true,
    text: 'Rekomendasi berhasil disimpan',
    button: {
      primary: 'Tutup',
      primaryAction: () => dispatch(setAlert({ status: false, name: 'recommendation' }))
    }
  };

  // akan diubah hit api sesuai search
  const searchedJob = job.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const selectHandler = (e) => {
    const { options } = e.target;

    for (let i = 0; i < options.length; i++) {
      const selected = select.find(v => v == options[i].value);

      if (options[i].selected && !selected) {
        const arr = [...select, options[i].value];
        setSelect(arr);
        input.roadmap.push(options[i].value);
      };
    };
  };

  const radioHandler = (e) => {
    const { name, value } = e.target;

    setPayment(prev => {
      const stateObj = { ...prev, status: value };

      switch (name) {
        case 'paidChecked':
          stateObj.paidChecked = true;
          stateObj.freeChecked = false;
          break;

        case 'freeChecked':
          stateObj.freeChecked = true;
          stateObj.paidChecked = false;
          break;
      };

      return stateObj;
    });

    inputHandler(e);
  };

  const inputHandler = (e) => {
    let { name, value } = e.target;

    if (value === 'paid' || value === 'free') {
      name = 'status';
      value = value === 'paid' ? true : false;
    };

    setInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const check = checkError(error);
    if (check) {
      // hit api save kelas
      console.log(input);
      dispatch(setAlert({ status: true, name: 'recommendation' }));
    };
  };

  const errorHandler = (e) => {
    const { name, value } = e.target;

    if (!value || value === 'Pilih roadmap') {
      setError(prev => ({
        ...prev,
        [name]: 'Input dilarang kosong'
      }));
    } else {
      setError(prev => ({
        ...prev,
        [name]: ''
      }));
    };
  };

  const checkError = (obj) => {
    for(let key in obj) {
      if (obj[key] != "") {
        return false;
      };
    };

    return true;
  };

  return (
    <div>
      <div>
        <h1 className="heading1 green">Berikan Rekomendasi Kelas</h1>
        <p className="paragraph-regular dark">
          Yuk bantu sesama perempuan untuk mendapat edukasi terbaik yang ada!
          isi form dengan data yang lengkap dan lihat kelas mu di list kelas.
        </p>
      </div>

      <div>
        <form>
          <label htmlFor="job" className="label-form">Pilih pekerjaan</label>
          <input type="text" name="job" className="input-text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} onBlur={errorHandler} />
          <ul>
            {search !== '' && searchedJob.map(v => (
              <li key={v.id} value={v.id} onClick={(e) => {
                setInput(prev => ({ ...prev, job: v.id }));
                setSearch(v.title);
                dispatch(getRoadmap(v.id));
                e.target.setAttribute('class', 'hidden');
              }}>{v.title}</li>
            ))}
          </ul>
          <span><SearchLineIcon className="green"></SearchLineIcon></span>
          {error.job && <p className="paragraph-regular text-[#FE0101]">{error.job}</p>}

          <label htmlFor="roadmap" className="label-form">Pilih roadmap pekerjaan</label>
          <select name="roadmap" onChange={selectHandler} onBlur={errorHandler}>
            <option defaultValue={-1}>Pilih roadmap</option>
            {roadmap.map((v, i) => (
              <option key={i} value={v.name}>{v.name}</option>
            ))}
          </select>
          {select.map((v, i) => (
            <p key={i} className="paragraph-regular dark">{v}</p>
          ))}
          {error.roadmap && <p className="paragraph-regular text-[#FE0101]">{error.roadmap}</p>}

          <label htmlFor="name" className="label-form">Nama kelas</label>
          <input type="text" name="name" value={input.name} className="input-text" onChange={inputHandler} onBlur={errorHandler} />
          {error.name && <p className="paragraph-regular text-[#FE0101]">{error.name}</p>}

          <label htmlFor="link" className="label-form">Link kelas</label>
          <input type="text" name="link" value={input.link} className="input-text" onChange={inputHandler} onBlur={errorHandler} />
          {error.link && <p className="paragraph-regular text-[#FE0101]">{error.link}</p>}

          <div>
            <label htmlFor="status" className="label-form">Status pembayaran</label>

            <input type="radio" name="paidChecked" value={'paid'} checked={payment.paidChecked} onChange={radioHandler} />
            <label className="paragraph-regular dark">Berbayar</label>

            <input type="radio" name="freeChecked" value={'free'} checked={payment.freeChecked} onChange={radioHandler} />
            <label className="paragraph-regular dark">Gratis</label>
          </div>

          <label htmlFor="description" className="label-form">Deskripsi kelas</label>
          <textarea name="description" value={input.description} cols="30" rows="10"
            className="pl-4 rounded-lg bg-[#EDEDED]" onChange={inputHandler} onBlur={errorHandler}></textarea>
          {error.description && <p className="paragraph-regular text-[#FE0101]">{error.description}</p>}

          <ButtonPrimary buttonText="Simpan" onClick={submitHandler} submit={true}></ButtonPrimary>
        </form>

      </div>

      {status && name === 'recommendation' && <Alert status={alert.status} text={alert.text}
        button={alert.button}></Alert>}
    </div>
  );
}

export default RecommendationPage;