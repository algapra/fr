"use client"
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const EcommerceExpenses = () => {
  // ** Hooks
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const cardWidth = isSmallScreen ? 'auto' : 'auto'
  const cardHeight = isSmallScreen ? 'auto' : 'auto'
  
  // Set chart height dynamically with a minimum of 100px
  const chartHeight = isSmallScreen ? 'auto' : '161px'

  const fontWeight = isSmallScreen ? 500 : 550

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.warning.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            fontSize: isSmallScreen ? '16px' : '22px',
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 15
      }
    }
  }

  return (
    <Card style={{ width: cardWidth, height: cardHeight }}>
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: fontWeight }}>Avr. <br /> Performance</Typography>
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
          Score
        </Typography>
        <ReactApexcharts type='radialBar' height={chartHeight} width='100%' series={[80]} options={options} />
        <Typography sx={{ color: 'text.secondary' }}>75</Typography>
        <Typography variant='body2' sx={{ textAlign: 'left', color: 'text.disabled' }}>
          Total Score Last Month
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EcommerceExpenses