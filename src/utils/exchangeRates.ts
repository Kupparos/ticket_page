import axios from "axios";

export async function exchangeRates(currency: string): Promise<number> {
  try {
    const { data } = await axios.get<any>(`https://api.exchangerate.host/convert?from=RUB&to=${currency}`);

    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);      
    } else {
      throw Error("unexpected error: ", error as ErrorOptions);
    }
  }

}
