import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export const axiosClient = (config: AxiosRequestConfig) => {
  try {
    const apiUrl = config.url || "";
    const url = process.env.NEXT_PUBLIC_API_URL + apiUrl;

    const auth = {
      username: process.env.NEXT_PUBLIC_CONSUMER_KEY || "",
      password: process.env.NEXT_PUBLIC_CONSUMER_SECRET || "",
    };

    return axios({
      ...config,
      url,
      auth,
    })
      .then((res: AxiosResponse) => {
        const {data} = res;

        return data;
      })
      .catch((err: AxiosError) => {
        console.log({err});
        return null;
      });
  } catch (error) {
    console.log({error});
    return null;
  }
};
