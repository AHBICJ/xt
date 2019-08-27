export default {
  methods: {
    imgAddress(image) {
      if (!image) return "null"
      if (image.toString().startsWith("http")) {
        return image
      } else {
        return process.env.VUE_APP_CDN + image
      }
    }
  },
  computed: {
    uploadAddr(){
      return process.env.VUE_APP_API + "/upload"
    }
  },
}