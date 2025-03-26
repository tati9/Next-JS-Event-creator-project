//import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList.js";

import { db } from "../lib/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first Mettup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg",
    address: "Some address 5, 1234 Some City",
    description: "Theis is a first meetup",
  },
  {
    id: "m2",
    title: "A second Mettup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg",
    address: "Some address 5, 1234 Some City",
    description: "Theis is a first meetup",
  },
  {
    id: "m3",
    title: "A thert Mettup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg",
    address: "Some address 5, 1234 Some City",
    description: "Theis is a first meetup",
  },
  {
    id: "m4",
    title: "A first Mettup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg",
    address: "Some address 5, 1234 Some City",
    description: "Theis is a first meetup",
  },
  {
    id: "m5",
    title: "A first Mettup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg",
    address: "Some address 5, 1234 Some City",
    description: "Theis is a first meetup",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
}
// // it garanted to run every request; if you need request obj, not pregenerate
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//pregeneratind page (cash and reused), faster
export async function getStaticProps(props) {
  // fetch data from an API
  const meetupsCollection = collection(db, "event"); // Reference Firestore collection
  const meetupsSnapshot = await getDocs(meetupsCollection);

  const meetups = meetupsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      meetups,
    },
    //revalidate: 10,
  };
}

export default HomePage;
