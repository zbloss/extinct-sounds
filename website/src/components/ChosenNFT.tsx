import NFTMapping from '../nfts.json';

const ChosenNFT = () => {
    
    const start_date = "2022-11-30"

    // @ts-ignore
    const start_Date = new Date(start_date).toISOString().split('T')[0];
    let current_Date = new Date().toISOString().split('T')[0]

    const difference_in_time = new Date(current_Date).getTime() - new Date(start_Date).getTime()
    const difference_in_days = difference_in_time / (1000 * 3600 * 24)
    
    const chosenTokenId = String(difference_in_days)

    if (chosenTokenId in NFTMapping) {

        if (chosenTokenId.length === 1) {
            return `0${chosenTokenId}`
        }
        return chosenTokenId
    }
    return "01"
}
export default ChosenNFT;