"use client"

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const PendingPayments = () => {
  const [livinByMandiri, setLivinByMandiri] = useState(false);
  const [atmMandiri, setATMMandiri] = useState(false);
  const [mandiriInternetBanking, setMandiriInternetBanking] = useState(false);

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'contentHeight'}}>
      <Box sx={{ width: '100%', maxWidth: 500, boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)', padding: '5vh', borderRadius: '10px' }}>
      <Box sx={{ 
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <img src="/images/payments/Pending.png" alt="Pembayaran Pending" style={{ width: '30%', margin: '0 auto 20px auto', display: 'block' }} />
          <Typography id="modal-description" sx={{ mt: 2, fontSize:22  }}>
            Menunggu Pembayaran
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, fontSize:22  }}>
            Sebelum Senin, 30 April 2024, 23:45 WIB
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, fontSize: 13 }}>
            Segera lakukan pembayaran sebelum waktu habis untuk bisa menggunakan <br/> website face recognition member
          </Typography>
          <Box sx={{ m: 4, border: '1px solid #ccc', borderRadius: '8px', p: 4   }}>
            <Typography sx={{ mb: 1, textAlign: 'left', fontSize:16 }}>
              <b>Detail Transaksi</b>
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="left">
                  Jenis Langganan
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="right">
                  Standard
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="left">
                  Kode Transaksi
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="right" color="#7B86EE">
                  AS12345Z
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="left">
                  Company Code
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="right">
                  70012
                </Typography>
              </Grid>
              <Grid item xs={6}sx={{pt:2}}>
                <Typography textAlign="left">
                  Nomor Virtual Account Bank Mandiri
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="right">
                  390807826448
                </Typography>
              </Grid>
              <Grid item xs={6}sx={{pt:2}}>
                <Typography textAlign="left">
                  Total Harga
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="right">
                  Rp 12.500.000
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{pt:2}}>
                <Typography textAlign="left">
                  Potongan Harga
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
             <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography textAlign="left">
                  <b>Total Pembayaran</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign="right">
                  <b>Rp 12.500.000</b>  
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{padding: '3vh'}}>
            <Typography sx={{ mb: 1, textAlign: 'left', fontSize:16 }}>
                <b>Detail Transaksi</b>
            </Typography>
            <Box sx={{ padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 14 }} onClick={() => setLivinByMandiri(!livinByMandiri)}>Livin By Mandiri</Typography>
                <IconButton onClick={() => setLivinByMandiri(!livinByMandiri)} size="small" sx={{ml: 'auto'}}>
                {livinByMandiri ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
            </Box>
            {livinByMandiri && (
                <Box sx={{padding: '1rem', border: '1px solid #7B86EE', borderRadius: '8px', marginLeft: 3, marginRight:5, marginTop:-3 }}>
                <Typography sx={{ fontSize: 12, textAlign: 'left' }}>
                    1. Select <b>Payment</b> on the main menu.<br/>
                    2. Select <b>Ecommerce</b>.<br/>
                    3. Select <b>Midtrans</b> in the service provider field.<br/>
                    4. Input <b>virtual account number</b> in the <b>payment code</b> field.<br/>
                    5. Click <b>continue</b> to confirm.<br/>
                    6. Payment complete.
                </Typography>
                </Box>
            )}
          <Box sx={{ padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:-4 }}>
                <Typography sx={{ fontSize: 14 }} onClick={() => setATMMandiri(!atmMandiri)}>ATM Mandiri</Typography>
                <IconButton onClick={() => setATMMandiri(!atmMandiri)} size="small" sx={{ml: 'auto'}}>
                {atmMandiri ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
            </Box>
            {atmMandiri && (
                <Box sx={{padding: '1rem', border: '1px solid #7B86EE', borderRadius: '8px', marginLeft: 3, marginRight:5, marginTop:-3 }}>
                <Typography sx={{ fontSize: 12, textAlign: 'left' }}>
                    1. Select pay/buy on the main menu.<br/>
                    2. Select <b>others.</b><br/>
                    3. Select <b>multi payment.</b><br/>
                    4. Input Midtrans company code<b> 70012.</b><br/>
                    5. Input <b>payment code</b>, then <b>confirm.</b><br/>
                    6. Payment complete.
                </Typography>
                </Box>
            )}
          <Box sx={{ padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:-4 }}>
                <Typography sx={{ fontSize: 14 }} onClick={() => setMandiriInternetBanking(!mandiriInternetBanking  )}>Mandiri Internet Banking</Typography>
                <IconButton onClick={() => setMandiriInternetBanking(!mandiriInternetBanking    )} size="small" sx={{ml: 'auto'}}>
                {mandiriInternetBanking  ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
            </Box>
            {mandiriInternetBanking  && (
                <Box sx={{padding: '1rem', border: '1px solid #7B86EE', borderRadius: '8px', marginLeft: 3, marginRight:5, marginTop:-3 }}>
                <Typography sx={{ fontSize: 12, textAlign: 'left' }}>
                    1. Select <b>Payment</b> on the main menu.<br/>
                    2. Select <b>multi payment.</b><br/>
                    3. Select <b>from account.</b><br/>
                    4. Select <b>Midtrans</b> in the<b> service provider</b> field<br/>
                    5. Input <b>payment</b> code, then <b>comfirm.</b><br/>
                    6. Payment complete.
                </Typography>
                </Box>
            )}
          </Box>
          <Button variant="contained" color="primary" sx={{ width: '93%' }}>
            Kembali
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PendingPayments
