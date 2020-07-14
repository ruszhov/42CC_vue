export default {
  name: "Loader",
  template: `
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status" :style="spinnerStyle">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `,
  data() {
    return {
      spinnerStyle: {
        height: "6rem !important",
        width: "6rem !important",
        position: "absolute",
        top: "40%",
      },
    };
  },
};
