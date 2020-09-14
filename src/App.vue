<template>
  <div>
    <div id="openseadragon" style="width: 100%; height: 600px;">
      <div id="search">
        <div id="radioButtons">
        <label id="caseId">
          <input
            type="radio"
            name="search_param"
            @change="radioButtonClicked($event)"
            class="form-control"
            value="case_id"
          />Case ID
        </label>
        <label id="domain">
          <input
            type="radio"
            name="search_param"
            @change="radioButtonClicked($event)"
            class="form-control"
            value="domain"
          />Domain
        </label>
        </div><!-- end of radioButtons -->
        <p id="currentCase" v-if="item && item.id">Currently displayed case: {{ item.name }}</p>
        <vue-suggestion
          v-model="item"
          :items="items"
          :setLabel="setLabel"
          :itemTemplate="itemTemplate"
          @changed="inputChange"
        ></vue-suggestion>
      </div><!-- end of search -->
    </div><!-- end of openseadragon -->
  </div> <!-- end of top div -->
</template>

<script>
import OpenSeadragon from "openseadragon";
import itemTemplate from "./components/ItemTemplate.vue";
import caseIds from "./data/caseIds.js";
import domains from "./data/domains.js";

export default {
  name: "app",
  data() {
    return {
      itemsApi: [],
      item: {},
      items: [],
      itemTemplate,
      isLoading: true,
      viewer: "",
      searchParam: "",
    };
  },
  methods: {
    radioButtonClicked(event) {
      this.searchParam = event.target.value;
    },
    setLabel(item) {
      var inputBoxDisplay = "";
      if (item.id == 0) {
        this.viewer.open(["/viewer/static/output/ara.dzi"]);
      } else {
        if (this.searchParam == "case_id") {
          inputBoxDisplay = item.name;
          this.item=item;
        } else {
          var caseId = caseIds.filter((caseId) => {
            return caseId.domain == item.domain;
          });
          this.item = caseId[0];
          inputBoxDisplay = item.domain;
        }
      }
      this.viewer.open([
        "/viewer/static/output/ara.dzi",
        "/viewer/static/output/" + this.item.name + ".dzi",
      ]);
      return inputBoxDisplay;
    },
    inputChange(text) {
      if (this.searchParam == "case_id") {
        this.items = caseIds.filter((item) =>
          new RegExp(text.toLowerCase()).test(item.name.toLowerCase())
        );
      } else {
        this.items = domains.filter((item) =>
          new RegExp(text.toLowerCase()).test(item.domain.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.viewer = OpenSeadragon({
      id: "openseadragon",
      prefixUrl: "/viewer/static/images/",
      tileSources: ["/viewer/static/output/ara.dzi"],
      showNavigator: true,
    });
  },
};
</script>

<style scope>
#search {
  margin: auto;
  position: absolute;
  bottom: 50%;
  right: 25px;
  z-index: 1;
  width: 200px;
  background:rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

#radioButtons {
  width: 100%;
  padding-bottom: 25px;
}

#currentCase {
  font-style: italic;
  margin: 0px;
}

#domain {
  float:right;
}
</style>