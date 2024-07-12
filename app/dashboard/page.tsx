'use client';

import Grid from '@mui/material/Grid';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import TotalMembers from '@/src/components/dashboard/analytics/TotalMembers';
import NewMembers from '@/src/components/dashboard/analytics/NewMembers';
import PastMembers from '@/src/components/dashboard/analytics/PastMembers';
import MemberDemographic from '@/src/components/dashboard/analytics/MemberDemographic';
import Typography from '@mui/material/Typography';
import Table from 'src/components/manage/member/Table';
import PageHeaderComponent from '@/src/components/manage/PageHeader';
import { useMember } from '@/src/hooks/useMember';
import { Member } from '@/src/services/member';

type RoleCount = {
  role: string;
  total: number;
};

function getRolesWithCounts(members: Member[]): RoleCount[] {
  const rolesCount: { [key: string]: number } = {};

  // Count occurrences of each role
  members.forEach((member: any) => {
    if (rolesCount[member.role]) {
      rolesCount[member.role]++;
    } else {
      rolesCount[member.role] = 1;
    }
  });

  // Convert the rolesCount object to the desired format
  const rolesWithCounts = Object.keys(rolesCount).map(role => {
    return { role: role, total: rolesCount[role] };
  });

  return rolesWithCounts;
}

const AnalyticsDashboard = () => {
  const { members } = useMember();
  const rolesWithCounts = getRolesWithCounts(members?.items ?? []);

  const dataCount = members?.items.length;
  const filteredDataIn = members?.items.filter((row: any) => {
    const status = row?.statuses[0];

    return status && typeof status === 'object' && status.type === 'Inactive';
  });
  const dataInactive = filteredDataIn?.length;

  const filteredDataAc = members?.items.filter((row: any) => {
    const status = row?.statuses[0];

    return status && typeof status === 'object' && status.type === 'Active';
  });
  const dataActive = filteredDataAc?.length;

  return (
    <ApexChartWrapper>
      <Typography variant='h6' fontWeight={200} width={1000}>
        Hallo
      </Typography>
      <Grid container spacing={6}>
        <PageHeaderComponent title={`Dashboard`} />
        <Grid item xs={6} sm={6} lg={2}>
          <TotalMembers dataCount={dataCount} />
        </Grid>
        <Grid item xs={6} sm={6} lg={2}>
          <NewMembers dataCount={dataActive} />
        </Grid>
        <Grid item xs={6} sm={6} lg={2}>
          <PastMembers dataCount={dataInactive} />
        </Grid>
        {/* <Grid item xs={6} sm={6} lg={2}>
          <AvrPerformance />
        </Grid> */}
        <Grid item xs={6} md={6} lg={4}>
          <MemberDemographic data={rolesWithCounts} />
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 20 }} xs={12} sm={6} lg={2.5}>
        <Table />
      </Grid>
    </ApexChartWrapper>
  );
};

export default AnalyticsDashboard;
