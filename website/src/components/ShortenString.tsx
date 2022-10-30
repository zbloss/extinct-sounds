const ShortenString = (originalString: String) : String => {

    let numberOfCharacters = 5;
    let firstPart = originalString.slice(0, numberOfCharacters);
    let lastPart = originalString.slice(originalString.length - numberOfCharacters);
    if (originalString.length > numberOfCharacters * 2 + 3) {
        return `${firstPart}...${lastPart}`
    } else {
        return originalString
    }
}
export default ShortenString;