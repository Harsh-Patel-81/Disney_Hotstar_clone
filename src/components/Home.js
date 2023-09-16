import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Orignals from "./Orignals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice"
import { selectUserName } from "../features/user/userSlice";

const Home = props => {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);


  useEffect(() => {
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trendings = [];
    const getData = async () => {
      const docRef = collection(db, "/movie");
      const q = query(docRef)
      const docs = await getDocs(q);
      docs.forEach(doc => {
        switch (doc.data().type) {
          case "recommend":
            // recommends.push({ id: doc.id, ...doc.data() });
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            // newDisneys.push({ id: doc.id, ...doc.data() });
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            // originals.push({ id: doc.id, ...doc.data() });
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            // trendings.push({ id: doc.id, ...doc.data() });
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            break;
          default:
            console.log("aler!!!");
            break;
        }
      })

      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trendings,
      }))
    }

    getData();
  }, [userName,dispatch])

  return <Container>
    <ImgSlider />
    <Viewers />
    <Recommends />
    <NewDisney />
    <Orignals />
    <Trending />
  </Container>
}

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;