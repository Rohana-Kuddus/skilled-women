import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { editClass, getClass, submitClass } from "../redux/slices/courseSlice";
import { useCookies } from "react-cookie";
import { getJobList } from "../redux/slices/jobSlice";
import { getRoadmap } from "../redux/slices/roadmapSlice";
import { getToast } from "../redux/slices/toastSlice";
import Toast from "../components/Toast";
import { getUserProfile } from "../redux/slices/userSlice";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import "../styles/pages/RecommendationPage.css";

function RecommendationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { courseDetail, courseMessage } = useSelector(state => state.course);
  const { job } = useSelector(state => state.job);
  const { roadmap } = useSelector(state => state.roadmap);
  const { user } = useSelector(state => state.user);
  const [cookies] = useCookies();
  const [hidden, setHidden] = useState('hidden');

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getJobList());
    dispatch(getUserProfile(cookies.token));
  }, []);

  // check edit page or add new course
  const location = useLocation();
  if (location.state !== null) {
    const { classId } = location.state;

    useEffect(() => {
      dispatch(getClass(cookies.token, classId));
    }, [courseDetail]);
  };

  useEffect(() => {
    if (courseMessage === 'Update Class Success' || courseMessage === 'Create Class Success') {
      dispatch(setAlert({ alert: true, alertName: 'recommendation' }));
    };
  }, [courseMessage]);

  const checkCourse = Object.keys(courseDetail).length !== 0;

  useEffect(() => {
    if (checkCourse) {
      const jobId = job.find(v => v.title === courseDetail.job).id;
      dispatch(getRoadmap(jobId));
    };
  }, [checkCourse]);

  // input states
  const [search, setSearch] = useState(checkCourse ? courseDetail.job : '');
  const [select, setSelect] = useState(checkCourse ? courseDetail.roadmap : []);
  const [input, setInput] = useState({
    jobId: checkCourse ? courseDetail.job : '',
    roadmapId: checkCourse ? courseDetail.roadmap : [],
    name: checkCourse ? courseDetail.name : '',
    link: checkCourse ? courseDetail.link : '',
    paid: checkCourse ? courseDetail.paid : true,
    description: checkCourse ? courseDetail.description : ''
  });
  const [payment, setPayment] = useState({
    status: checkCourse ? courseDetail.paid === true ? 'paid' : 'free' : 'paid',
    paidChecked: checkCourse ? courseDetail.paid === true ? true : false : true,
    freeChecked: checkCourse ? courseDetail.paid === true ? false : true : false
  });
  const [error, setError] = useState({
    job: '',
    roadmap: '',
    name: '',
    paid: '',
    description: ''
  });

  const alertObj = {
    status: true,
    text: 'Rekomendasi berhasil disimpan',
    button: {
      primary: 'Tutup',
      primaryAction: () => {
        navigate(`/profiles/${user.id}/recommendations`);
        dispatch(setAlert({ alert: false, alertName: 'recommendation' }));
      }
    }
  };

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
    setHidden('');
    dispatch(getJobList({ search: value }));
  };

  const selectHandler = (e) => {
    const { options } = e.target;

    for (let i = 0; i < options.length; i++) {
      const id = parseInt(options[i].value.replace(/\D+/g, ''));
      const text = options[i].value.replace(/[0-9]/g, '');
      const name = text.replace(/^ +/gm, '');

      const selected = select.find(v => v === name);
      if (options[i].selected && !selected) {
        const arr = [...select, name];
        setSelect(arr);
        input.roadmapId = [...input.roadmapId, id];
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

  const removeHandler = (v) => {
    const newArr = select.filter(val => val !== v);
    setSelect([...newArr]);
    input.roadmapId = newArr;
  };

  const inputHandler = (e) => {
    let { name, value } = e.target;

    if (value === 'paid' || value === 'free') {
      name = 'paid';
      value = value === 'paid' ? true : false;
    };

    setInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const check = Object.keys(error).length !== 0;
    if (check) {
      const payload = {
        token: cookies.token,
        data: input
      };

      if (location.state !== null) {
        const { classId } = location.state;
        const roadmapId = [];
        
        const arrStr = roadmap.filter(v => input.roadmapId.includes(v.name));
        if (arrStr.length !== 0) {
          const checkArr = input.roadmapId.every(i => typeof i === "string");
          if (!checkArr) {
            for (let i = 0; i < input.roadmapId.length; i++) {
              if (typeof input.roadmapId[i] === 'string') {
                input.roadmapId[i] = arrStr.find(val => val.name === input.roadmapId[i]).id;
              }
            }
          } else {
            input.roadmapId.map(v => {
              const id = arrStr.find(val => val.name === v).id;
              roadmapId.push(id);
            });
            payload.data.roadmapId = roadmapId;
          };
        };

        payload.classId = classId;

        dispatch(editClass(payload));
      } else {
        console.log(payload);
        dispatch(submitClass(payload));
      };

      if (!courseMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'addClass' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'addClass' }));
        }, 3000);
      };
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

  return (
    <div className="">
      <div className="form-heading">
        <h1 className="heading1 green ">Berikan Rekomendasi Kelas</h1>
        <p className="rekomendasi-p">
          Yuk bantu sesama perempuan untuk mendapat edukasi terbaik yang ada!<br />
          isi form dengan data yang lengkap dan lihat kelas mu di list kelas.
        </p>
      </div>

      <div>
        <form className="form">
          <div className="relative">
            <label htmlFor="job" className="label-form">Pilih pekerjaan</label>
            <input type="text" name="job" placeholder="Masukkan nama pekerjaan" className="input-text block mt-1" autoFocus value={search} onChange={searchHandler} onBlur={errorHandler} />
            <ul className={`${hidden}`} onClick={() => setHidden('hidden')}>
              {search !== '' && job.map(v => (
                <li className="search-option" key={v.id} value={v.id} onClick={() => {
                  setSearch(v.title);
                  setInput(prev => ({ ...prev, jobId: v.id, roadmapId: [] }));
                  dispatch(getRoadmap(v.id));
                  setSelect([]);
                }}>{v.title}</li>
              ))}
            </ul>
            <span className="search-icon"><SearchLineIcon className="green"></SearchLineIcon></span>
            {error.job && <p className="paragraph-regular text-[#FE0101]">{error.job}</p>}
          </div>

          <div>
            <label htmlFor="roadmap" className="label-form">Pilih roadmap pekerjaan</label>
            <select name="roadmap" className="form-select" onChange={selectHandler} onBlur={errorHandler}>
              <option className="option" defaultValue={-1}>Pilih roadmap</option>
              {roadmap.map((v, i) => (
                <option key={i} value={`${v.id} ${v.name}`}>{v.name}</option>
              ))}
            </select>
            {select.map((v, i) => (
              <div className="flex justify-between form-select" key={i}>
                <p className="paragraph-regular green">{v}</p>
                <span onClick={() => removeHandler(v)}><CloseLineIcon className="hover:cursor-pointer"></CloseLineIcon></span>
              </div>
            ))}
            {error.roadmap && <p className="paragraph-regular text-[#FE0101]">{error.roadmap}</p>}
          </div>

          <div>
            <label htmlFor="name" className="label-form">Nama kelas</label>
            <input type="text" name="name" placeholder="Masukkan nama kelas" value={input.name} className="input-text mt-1" onChange={inputHandler} onBlur={errorHandler} />
            {error.name && <p className="paragraph-regular text-[#FE0101]">{error.name}</p>}
          </div>

          <div>
            <label htmlFor="link" className="label-form">Link kelas</label>
            <input type="text" name="link" placeholder="Link kelas" value={input.link} className="input-text mt-1" onChange={inputHandler} onBlur={errorHandler} />
            {error.link && <p className="paragraph-regular text-[#FE0101]">{error.link}</p>}
          </div>

          <div>
            <label htmlFor="paid" className="label-form">Status pembayaran</label>
            <ul className="grid w-96 md:grid-cols-2">
              <li>
                <input className="hidden peer" type="radio" id="radio-paid" name="paidChecked" value={'paid'} checked={payment.paidChecked} onChange={radioHandler} />
                <label htmlFor="radio-paid" className="radio-option rounded-l-md">Berbayar</label>
              </li>
              <li>
                <input className="hidden peer" type="radio" id="radio-free" name="freeChecked" value={'free'} checked={payment.freeChecked} onChange={radioHandler} />
                <label htmlFor="radio-free" className="radio-option rounded-r-md">Gratis</label>
              </li>
            </ul>
          </div>

          <div>
            <label htmlFor="description" className="label-form">Deskripsi kelas</label>
            <textarea name="description" placeholder="Deskripsi singkat kelas" value={input.description} cols="30" rows="10"
              className="pl-4 pt-2 rounded-lg bg-[#EDEDED] w-96 mt-1 dark" onChange={inputHandler} onBlur={errorHandler}></textarea>
            {error.description && <p className="paragraph-regular text-[#FE0101]">{error.description}</p>}
          </div>

          <div className="mt-7">
            <ButtonPrimary buttonText="Simpan" onClick={submitHandler} submit={true} padding="px-40"></ButtonPrimary>
          </div>
        </form>
      </div>

      {alert && alertName === 'recommendation' && <Alert status={alertObj.status} text={alertObj.text}
        button={alertObj.button}></Alert>}
      {toast && toastName === 'addClass' && <Toast message={courseMessage}></Toast>}
    </div>
  );
}

export default RecommendationPage;