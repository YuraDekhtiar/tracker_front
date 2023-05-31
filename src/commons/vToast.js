

module.exports = {
  success: (thisObject, message) => {
    thisObject.$toast.success(
      message,
      options
    );
  },
  error: (thisObject, message) => {
    thisObject.$toast.error(
      message,
      options
    )
  }

}

const options = {
  position: "top-right",
  duration: 2000
}
