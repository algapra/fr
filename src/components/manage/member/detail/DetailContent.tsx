import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TableColumns from './TableColumns';
import { useParams } from 'next/navigation';
import { useMember } from '@/src/hooks/useMember';
import { Member } from '@/src/services/member';
import DetailMember from './DetailMember';
import FallbackSpinner from '@/src/@core/components/spinner';
import { presenseFormat } from '@/src/utils/presenseFormat';
import PageHeaderComponent from '../../PageHeader';

const DetailContent = () => {
  const params = useParams();
  const [dataMember, setDataMember] = useState<Member>()
  const { members, isLoading } = useMember();

  useEffect(() => {
    if (params?.id) {
      setDataMember(members?.items.find((member) => member.id === params?.id as string));
    }
  }, [members, params])

  const dataPresense = presenseFormat(dataMember)

  if (isLoading) {
    return (
      <Grid>
        <FallbackSpinner sx={{ width: 1200 }} />
      </Grid>
    )
  }

  return (
    <>
      <PageHeaderComponent title='Detail Member' dataPresensi={dataPresense} dataMember={dataMember} />
      <DetailMember data={dataMember} />
      <Grid item xs={12}>
        <TableColumns datas={dataPresense} isLoading={isLoading} />
      </Grid>
    </>
  );
};

export default DetailContent;
