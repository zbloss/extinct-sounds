import ShortenString from './ShortenString';

// @ts-ignore
const WelcomeName = (params) => {

    if (params) {
        const address = params.address;
        const ensName = params.ensName;

        if (ensName) {
            return ensName
        }

        if (address) {
            return ShortenString(address)
        }
    }

    return "";

} 
export default WelcomeName;