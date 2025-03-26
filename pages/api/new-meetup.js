// api/new-meetup
//POST /api/new-meetup
import { db } from "../../lib/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

async function handler(req, res) {
  //   if (req.method === "POST") {
  //     const data = req.body;
  //     const { title, image, address, description } = data;
  //   }

  try {
    const docRef = await addDoc(collection(db, "event"), req.body);
    res.status(200).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default handler;
