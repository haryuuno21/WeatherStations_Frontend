import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const getCurrentReport = createAsyncThunk<number|null|undefined>('data/getCurrentReport', async () =>
    api.stations.stationsList().then(({ data }) => data.current_report)
)