import MeetupDetail from "../../components/meetups/MeetupDetail.js";

import { db } from "../../lib/firebaseConfig.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function MeetupDetailes(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const meetupsCollection = collection(db, "event");
  const meetupsSnapshot = await getDocs(meetupsCollection);

  const paths = meetupsSnapshot.docs.map((doc) => ({
    params: { meetupId: doc.id }, // Each ID is a route param
  }));

  return {
    fallback: false, // Show 404 if page not pre-generated
    paths,
  };
}

export async function getStaticProps(context) {
  // fetch data for singl meetup
  const meetupId = context.params.meetupId;
  const meetupRef = doc(db, "event", meetupId);
  const meetupSnap = await getDoc(meetupRef);

  if (!meetupSnap.exists()) {
    return {
      notFound: true, // Show 404 if meetup not found
    };
  }

  const meetupData = meetupSnap.data();

  //console.log(meetupId);
  return {
    props: {
      meetupData: {
        image: meetupData.image || "",
        id: meetupId,
        title: meetupData.title || "No description ",
        address: meetupData.address || "No description",
        description: meetupData.description || "No description",
      },
    },
  };
}

export default MeetupDetailes;
