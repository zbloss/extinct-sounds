const ChainId = () => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        return 5
    } else {
        return 5
    }
}
export default ChainId;