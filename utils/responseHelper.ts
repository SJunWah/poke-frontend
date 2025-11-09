export const responseDataHandler = (response: {
    data: { error: any; status: number; msg: any; data: any };
    status: number;
    statusText: string;
}) => {
    const { data, status, statusText } = response;
    if (status !== 200) throw new Error(data.msg);
    if (data.error || data.status !== 200) throw new Error(data.msg);
    return data.data;
};

export const errorResponseHandler = (error: any) => {
    throw new Error(error.response?.data?.msg || error.message);
};