import formatDate from "../filters/formatDate.js";
export default {
  name: "HttpRequests",
  template: `
    <div class="container">
      <h1>42 Coffee Cups Test Assignment #15</h1>
      <router-link
        tag="p"
        to="/"
        >
        <a class="btn btn-primary" >back to main page</a>
      </router-link>
      <p>New Entries: <span id="new-entries" :style="newEntriesStyle">0</span></p>
      <table class="http-requests table-bordered" id="http-requests" :style="tableStyle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Priority</th>
            <th>Date/time</th>
            <th>Request Method</th>
            <th>URL</th>
            <th>Server Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests">
            <td>{{request.id}}</td>
            <td><mark>{{request.priority}}</mark></td>
            <td>{{request.date | dateFilter}}</td>
            <td>{{request.request_method}}</td>
            <td>{{request.url}}</td>
            <td>{{request.server_protocol}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data() {
    return {
      requests: {},
      tableStyle: {
        width: "100%",
        paddingLeft: "5px",
      },
      newEntriesStyle: {
        fontWeight: "bold",
      },
    };
  },
  async mounted() {
    await axios.get("/api/http_requests?_limit=10").then((response) => {
      this.requests = response.data;
      localStorage.setItem(
        "total_requests",
        response.data[Object.keys(response.data)[0]].id
      );
    });

    async function getNewRequests() {
      await axios.get("/get_requests/").then((response) => {
        const total =
          response.data.total -
          parseInt(localStorage.getItem("total_requests"));
        const currentUrl = window.location.hash.split("#")[1];
        if (total !== 0 && currentUrl === "/http_requests") {
          document.title = `(${total}) - 42 CC Ticket#15`;
          document.getElementById("new-entries").innerHTML = total;
        } else {
          document.title = `42 CC Ticket#15`;
        }
      });
    }
    setInterval(getNewRequests, 3000);
  },
  filters: {
    dateFilter: formatDate,
  },
};
