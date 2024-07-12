import { systemVariable } from '../../variable';
import { NextApiRequest, NextApiResponse } from 'next';
import { to } from 'await-to-js';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = req.body;
    
    body.facegallery_id = systemVariable.faceGaleryId;
    body.trx_id = systemVariable.trxId;
    const [err, data] = await to(
      axios.post(`${systemVariable.backendUrl}/identify-face`, body, {
        headers: {
          Accesstoken: systemVariable.accessToken,
        },
      })
    );
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (err) {
      return res
        .status(500)
        .json({ error: 'Terjadi kesalahan dalam mengarahkan permintaan' });
    }
    
    return res.status(200).send({ data: data.data.risetai });
  }
};

export default handler;
