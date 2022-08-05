function getSpeechSSMLStr(text: any, preText = "", postText = "", style = "neutral", styleDegree = 2) {
    return `<speak version=\"1.0\" xmlns=\"http:\/\/www.w3.org\/2001\/10\/synthesis\"\r\n    xmlns:mstts=\"https:\/\/www.w3.org\/2001\/mstts\" xml:lang=\"en-US\">\r\n    <voice name=\"en-US-JennyNeural\">\r\n        <mstts:express-as style=\"neutral\">\r\n            ${preText}\r\n        <\/mstts:express-as>\r\n    <\/voice>\r\n    <voice name=\"en-US-JennyNeural\">\r\n        <mstts:express-as style=\"${style}\" styledegree=\"${styleDegree}\">\r\n            ${text}\r\n        <\/mstts:express-as>\r\n    <\/voice>\r\n    <voice name=\"en-US-JennyNeural\">\r\n        <mstts:express-as style=\"neutral\">\r\n            ${postText}\r\n        <\/mstts:express-as>\r\n    <\/voice>\r\n<\/speak>`
}

export default getSpeechSSMLStr;