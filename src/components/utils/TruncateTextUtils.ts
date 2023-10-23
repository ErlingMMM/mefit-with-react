const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    const lastPunctuationIndex = Math.max(
      description.lastIndexOf('.', maxLength),
      description.lastIndexOf('?', maxLength),
      description.lastIndexOf('!', maxLength)
    );
    if (lastPunctuationIndex >= 0) {
      return description.slice(0, lastPunctuationIndex + 1);
    }
    // If no suitable punctuation is found, truncate at maxLength
    return description.slice(0, maxLength);
  };
  
  export { truncateDescription };
  