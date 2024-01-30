import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function RecommendationPage() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState([]);
  const [payment, setPayment] = useState({
    status: 'paid',
    paidChecked: true,
    freeChecked: false
  });
  const [input, setInput] = useState({
    job: '',
    roadmap: [],
    name: '',
    link: '',
    status: true,
    description: ''
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
      primaryAction: () => dispatch(setStatus(false))
    }
  };

  // dummy data roadmap, nanti akan ambil dari selctor
  const roadmap = [
    {
      id: 1,
      name: 'Pengenalan petani hidroponik 1',
      step: 1
    },
    {
      id: 2,
      name: 'Pengenalan petani hidroponik 2',
      step: 2
    },
    {
      id: 3,
      name: 'Pengenalan petani hidroponik 3',
      step: 3
    },
    {
      id: 4,
      name: 'Pengenalan petani hidroponik 4',
      step: 4
    },
    {
      id: 5,
      name: 'Pengenalan petani hidroponik 5',
      step: 5
    }
  ];

  // dummy data job. akan diambil pakai selctor redux
  const jobs = [
    {
      title: "Graphic Designer",
      image: "https://source.unsplash.com/tuned-on-macbook-CGpifH3FjOA",
      industry: "Kreatif",
      description: "Ciptakan kreasi desain art kamu secara digital!",
      id: 1
    },
    {
      title: "Petani Hidroponik",
      image: "https://source.unsplash.com/text-s_AgJxMc4zk",
      industry: "Agrikultur",
      description: "Cocok untuk kamu yang ingin membuka usaha tanaman hidroponik atau berkebun sendiri ~",
      id: 2
    },
    {
      title: "Fotografer",
      image: "https://source.unsplash.com/person-holding-canon-dslr-camera-hfk6xOjQlFk",
      industry: "Kreatif",
      description: "Hobi foto-foto atau suka fotoin temen kamu? Yuk belajar menjadi fotografer handal!",
      id: 3
    },
    {
      title: "Digital Marketing Consoultant",
      image: "https://source.unsplash.com/person-writing-on-white-paper-U33fHryBYBU",
      industry: "Bisnis",
      description: "Bantu konsultasi tim marketing kamu dengan menjadi digital marketing consoultant",
      id: 4
    },
    {
      title: "Video Editor ",
      image: "https://source.unsplash.com/black-flat-screen-tv-turned-on-displaying-game-B4f_Kx5jvpg",
      industry: "Kreatif",
      description: "Jago ngedit video? Jadi Video editor aja!",
      id: 5
    },
    {
      title: "Pilot Drone",
      image: "https://source.unsplash.com/brown-and-black-wooden-table-U9vKDttdNLA",
      industry: "Teknologi",
      description: "Hobi main game console & pesawat? Jadi pilot drone yuk! ",
      id: 6
    }
  ];

  // akan diubah hit api sesuai search
  const searchedJob = jobs.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

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
      dispatch(setStatus(true));
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

  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

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
                setInput(prev => ({ ...prev, job: v.title }));
                setSearch(v.title);
                e.target.setAttribute('class', 'hidden');
                // akan ditambah hit api untuk ambil roadmap berdasar pekerjaan
              }}>{v.title}</li>
            ))}
          </ul>
          <span><SearchLineIcon className="green"></SearchLineIcon></span>
          {error.job && <p className="paragraph-regular text-[#FE0101]">{error.job}</p>}

          <label htmlFor="roadmap" className="label-form">Pilih roadmap pekerjaan</label>
          <select name="roadmap" onChange={selectHandler} onBlur={errorHandler}>
            <option defaultValue={-1}>Pilih roadmap</option>
            {roadmap.map((v, i) => (
              <option key={i} value={i}>{v.name}</option>
            ))}
          </select>
          {select.map(id => (
            <p key={id} className="paragraph-regular dark">
              {roadmap[id].name}
            </p>
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

      {status && <Alert status={alert.status} text={alert.text}
        button={alert.button}></Alert>}
    </div>
  );
}

export default RecommendationPage;