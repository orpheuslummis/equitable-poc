import { Web3Storage, File } from "web3.storage";

const toks = process.env.WEB3STORAGE_API_TOKEN;
const client = new Web3Storage({ token: toks ||'' });

export const getJSONFromFileinCID = async (_cid: string) => {
  const res = await client.get(_cid);
  if (res) {
    const filesArr = await res.files(); // Web3File[]
    let abc = filesArr[0].cid;
    const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
      dets.json(),
    );
    return data;
  }
};

export const getJSONFromCID = async (_cid: any) => {
  const json = await client.get(_cid);
  if (!json) {
    // handle the case where `json` is null
    throw new Error("Unable to get JSON from CID");
  }
  const filesArr = await json.files(); // Web3File[]
  let abc = filesArr[0].cid;
  const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
    dets.json(),
  );
  return data;
};

export const putFileandGetHash = async (file: any) => {
  const content = new Blob([file], { type: "application/json" });
  const fileObj = new File([content], "file", {
    type: "application/json",
  });
  const res = await client.put([fileObj], { wrapWithDirectory: false });
  return res;
};

export const putJSONandGetHash = async (json: any) => {
  const content = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  const fileObj = new File([content], "file.json", {
    type: "application/json",
  });
  const res = await client.put([fileObj]);
  return res;
};

export const pushImgToStorage = async (file: any) => {
  const res = await client.put([file], { wrapWithDirectory: false });
  return res;
};