const addData = async (collectionref, doc, Data) => {
    try {
      if (Data && collectionref) {
        if(! ("created" in Data)){
            Data["created"] = new Date().toString();
          }

        if (doc && doc.length > 0) {
          await collectionref.doc(doc).set(Data);
        } else {
          await collectionref.add(Data);
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
};

const getData = async (Collectionref) => {
    try {
      var data = await Collectionref.get();
      var Data = [];
      data.forEach((element) => {
        // console.log("From element", element.id)
        Data.push({...element.data(), ...{"doc":element.id}});
      });
      return Data;
    } catch (error) {
      console.log(error);
    }
};

const updateDoc = async (collectionRef, docName, Data) => {
  try{
    await collectionRef.doc(docName).set(Data)
  }catch(e){
    console.log("error in updating doc", e)
  }
  
}

const getDocOnCondition = async(collection, attr=null, val=null)=>{
  try{
      let Docs = []
      if(!attr){
        console.log("coming here", collection)

        const docs = await collection.get();
        console.log("From firestore", docs)
        docs.forEach((element) => {
          Docs.push(element.id)
        });
        return Docs
      }
      const docs = await collection.where(attr, "==", val).get()
      
      docs.forEach((element) => {
        Docs.push(element.id)
      });
      return Docs
  }catch(e){
    console.log("fetching doc names", e)
  }
}

const getDocDataOnCondition = async(collection, attr, val)=>{
  try{
      const docs = await collection.where(attr, "==", val).get()
      let Docs = []
      docs.forEach((element) => {
        Docs.push(
          {
            id: element.id,
            data : element.data()
          }
        )
      });
      return Docs
  }catch(e){
    console.log("fetching doc names", e)
  }
}

const getDatafromDoc = async (docref) => {
    try {
      var data = await docref.get();
      var Data = [];
      data.forEach((element) => {
        Data.push(element.data());
      });
      return Data;
    } catch (error) {
      console.log(error);
    }
};


const handleFireBaseUpload = async(name, imgFile, ref) => {  
  console.log('start of upload')
  console.log(name)
  const uploadTask = await storage.ref(`/${ref}/${name}`).put(imgFile)
  var imagePathRef = storage.ref(`/${ref}/`).child(name);  
  const url = await imagePathRef.getDownloadURL();
  console.log(url)
  return url
}

module.exports = { getData, getDocDataOnCondition }