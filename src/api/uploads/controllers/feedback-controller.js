const getFeedbackHandler = {
  handler: async (request, h) => {
    return h.response(feedback).code(200)
  }
}

export { getFeedbackHandler }
