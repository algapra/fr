// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Grid from '@mui/material/Grid'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

// Styled component untuk lingkaran kecil
const ColorCircle = styled('span')(({ theme, color }) => ({
  display: 'inline-block',
  width: theme.spacing(2),
  height: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: theme.spacing(1),
}));

interface MemberDemographicProps {
  data: { role: string; total: number }[]
}

const MemberDemographic:React.FC<MemberDemographicProps> = ({data}) => {
  // Hook
  const theme = useTheme()

  const labelColors = [
    hexToRGBA(theme.palette.primary.main, 0.7),
    hexToRGBA(theme.palette.error.main, 0.7),
    hexToRGBA(theme.palette.success.main, 0.16),
    hexToRGBA(theme.palette.warning.main, 0.5),
  ]

  // Compute labels and totalData from data
  const { labels, totalData } = useMemo(() => {
    const sortedData = data.sort((a, b) => b.total - a.total);
    const labels = sortedData.map(item => item.role);
    const totalData = sortedData.map(item => item.total);

    return { labels, totalData, };
}, [data]);


  const options: ApexOptions = {
    colors: labelColors,
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: labels,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              fontSize: '1.75rem',
              formatter: val => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 200, height: 256 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 200, height: 200 }
        }
      }
    ]
  }

  // Menghitung total untuk persentase
  const total = useMemo(() => totalData.reduce((acc, val) => acc + val, 0), [totalData]) ?? [];
  const DisplayTop4 = totalData.slice(0, 4)
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div>
                <Typography variant='h6' sx={{ mb: 2, pr: 3, fontWeight: 600 }}>
                  Member <br /> Demographic
                </Typography>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Typography variant='body2'>Updated 1 month ago</Typography>
              </div>
            </div>
            {data.length === 0 ? (
              <Typography variant='body2'>No data available</Typography>
            ) : (
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div style={{ marginTop: 25, marginBottom: 25, position: 'relative', flex: '0 0 auto', marginRight: theme.spacing(2) }}>
                  <ReactApexcharts type='donut' width={150} height={150} series={totalData} options={options} />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div style={{ marginLeft: 58, marginTop: 25 }}>
                  <Box>
                    {[...Array(Math.ceil(DisplayTop4.length / 2))].map((_, rowIndex) => (
                      <div key={rowIndex} style={{ display: 'flex', marginBottom: theme.spacing(1), justifyContent: 'space-between'}}>
                        {DisplayTop4.slice(rowIndex * 2, rowIndex * 2 + 2).map((value, colIndex) => (
                          <div key={colIndex} style={{ marginRight: theme.spacing(2) }}>
                            <Grid container minWidth={100}>
                              <Grid item>
                                <ColorCircle color={labelColors[rowIndex * 2 + colIndex]} />
                              </Grid>
                              <Grid item xs={2}>
                                <Typography variant="body2">
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{Math.round((value / total) * 100)}%</h4>
                                    <h4 style={{ fontSize: '0.7rem', fontWeight: 700 }}> {options.labels?.[rowIndex * 2 + colIndex]}</h4>
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Box>
                </div>
              </Grid>
            </Grid>
             )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MemberDemographic
