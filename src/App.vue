<template>
  <div id="topdiv">
    <div id="openseadragon" style="width: 100%; height: 600px">
      <div id="allClearToggles">
        <input
          type="checkbox"
          id="checkbox"
          v-model="selectAllChecked"
          @change="selectAll()"
        />
        <label class="cursor-pointer hover:text-blue-600" for="checkbox"
          >All</label
        >
        <p
          class="clearButton cursor-pointer hover:text-blue-600"
          id="clearToggle"
          v-on:click="clear()"
        >
          Clear
        </p>
      </div>
      <multilevel-accordion :tree="tree" :marginLeft="2">
        <div slot-scope="{ tree, expanded, leaf }">
          <div
            class="relative mb-3 border rounded-full text-white"
            style="
              transition: box-shadow 0.5s, background-color 0.5s, color 0.5s;
              border-style: none;
            "
          >
            <input
              v-if="leaf"
              v-model="checked"
              type="checkbox"
              class="cursor-pointer"
              :id="tree.text + '_checkbox'"
              :value="tree.text"
              @change="select(tree.text)"
            />
            <label
              v-if="leaf"
              :for="tree.text + '_checkbox'"
              class="cursor-pointer hover:text-blue-600"
              :class="tree.text"
              >{{ tree.text.split("_")[0] }}</label
            >
            <p
              v-if="!leaf"
              :id="tree.text"
              class="
                domain
                cursor-pointer
                relative
                text-left
                hover:text-blue-600
              "
              style="top: 0.05rem; left: 10px; font-size: 13px"
            >
              {{ expanded ? "−" : "+" }} {{ tree.text }}
            </p>
          </div>
        </div>
      </multilevel-accordion>
      <div id="fileDownloads">
        <p>Tables</p>
        <div>
            <a href="/static/files/GPe58_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
            GPe58_boxgrid_data.csv
            </a>
        </div>

        <div>
            <a href="/static/files/GPe60_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          GPe60_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/GPe62_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          GPe62_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/GPe64_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          GPe64_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/GPe66_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          GPe66_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/GPe68_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          GPe68_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr81_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr81_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr83_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr83_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr85_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr85_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr87_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr87_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr89_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr89_boxgrid_data.csv
          </a>
        </div>

        <div>
            <a href="/static/files/SNr91_boxgrid_data.csv" download>
            <b-icon icon="download" aria-hidden="true"></b-icon>
          SNr91_boxgrid_data.csv
          </a>
        </div>

      </div>
    </div>
    <!-- end of openseadragon -->
  </div>
  <!-- end of top div -->
</template>

<script>
import OpenSeadragon from "openseadragon";
import caseIds from "./data/caseIds.js";
import MultilevelAccordion from "vue-multilevel-accordion";

export default {
  components: {
    MultilevelAccordion,
  },
  data() {
    return {
      githubPrefix: process.env.GITHUB_PREFIX,
      tree: caseIds,
      selectedLayers: [],
      tiledImages: [],
      checked: [],
      allCaseIds: [],
      selectAllChecked: "",
    };
  },
  methods: {
    select(caseId) {
      let domains = [];
      this.tree.children.forEach(function (value) {
        value.children.forEach(function (child) {
          if (child.text == caseId) {
            domains.push(value.text);
          }
        });
      });

      const prefix = this.githubPrefix;
      const index = this.selectedLayers.indexOf(caseId);

      if (index > -1) {
        // Remove layer
        this.selectAllChecked = false;
        document.getElementsByClassName(caseId).forEach(function (el) {
          el.classList.remove("active");
        });
        domains.forEach(function (domain) {
          document.getElementById(domain).classList.remove("active");
        });
        this.selectedLayers.splice(index, 1);
        let count = this.viewer.world.getItemCount();
        let i = 0;
        for (var i = 0; i < count; i++) {
          let tiledImage = this.viewer.world.getItemAt(i);
          if (tiledImage.source.tilesUrl.includes(caseId)) {
            this.viewer.world.removeItem(tiledImage);
            i = count;
          }
        }
      } else {
        // Add layer to viewer
        document.getElementsByClassName(caseId).forEach(function (el) {
          el.classList.add("active");
        });
        domains.forEach(function (domain) {
          document.getElementById(domain).classList.add("active");
        });
        this.selectedLayers.push(caseId);
        this.viewer.addTiledImage({
          tileSource: prefix + "/static/output/" + caseId + ".dzi",
        });
      }
    },
    selectAll() {
      const prefix = this.githubPrefix;
      if (this.selectAllChecked) {
        // Check all boxes
        let layers = [...this.selectedLayers];
        let count = 0;

        let domains = [];
        this.tree.children.forEach(function (value) {
          value.children.forEach(function (child) {
            if (child.text == layers[i]) {
              domains.push(value.text);
            }
          });
        });

        for (var i = 0; i < layers.length; i++) {
          // Remove each selected layer
          //this.select(layers[i]);
          document.getElementsByClassName(layers[i]).forEach(function (el) {
            el.classList.remove("active");
          });
          domains.forEach(function (domain) {
            document.getElementById(domain).classList.remove("active");
          });
          let ind = this.selectedLayers.indexOf(layers[i]);
          this.selectedLayers.splice(ind, 1);
          let count = this.viewer.world.getItemCount();
          let i = 0;
          for (var i = 0; i < count; i++) {
            let tiledImage = this.viewer.world.getItemAt(i);
            if (tiledImage.source.tilesUrl.includes(layers[i])) {
              this.viewer.world.removeItem(tiledImage);
              i = count;
            }
          }
        }
        this.checked = [...this.allCaseIds];
        for (var j = 0; j < this.checked.length; j++) {
          // Add/remove all layers
          this.select(this.checked[j]);
        }
      } else {
        // Remove all checks
        this.clear();
      }
    },
    clear() {
      this.checked = [];
      this.selectAllChecked = false;
      let layers = [...this.selectedLayers];
      let count = 0;
      for (var i = 0; i < layers.length; i++) {
        // Remove each selected layer
        this.select(layers[i]);
      }
    },
  },
  mounted() {
    const prefix = this.githubPrefix;
    this.viewer = OpenSeadragon({
      id: "openseadragon",
      prefixUrl: "/basalganglia/static/images/",
      tileSources: this.githubPrefix + "/static/output/ara-whitebg.dzi",
      showNavigator: true,
    });
    let cases = [];
    this.tree.children.forEach(function (domain) {
      domain.children.forEach(function (caseId) {
        if (!cases.includes(caseId.text)) {
          // Remove layer
          cases.push(caseId.text);
        }
      });
    });
    this.allCaseIds = cases;
  },
};
</script>

<style>
body {
  background: black;
}

#topdiv {
  background: black;
}

.accordion-root {
  width: 15%;
  height: 350px;
  top: 100px;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  left: 20px;
  border-left: thin solid grey;
  border-bottom: thin solid grey;
  border-right: thin solid grey;
  border-top: none;
  background-color: rgba(20, 20, 20, 1);
}

#allClearToggles {
  width: 15%;
  height: 30px;
  top: 70px;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  left: 20px;
  border-left: thin solid grey;
  border-bottom: none;
  border-right: thin solid grey;
  border-top: thick solid grey;
  background-color: rgba(20, 20, 20, 1);
  font-style: italic;
  font-size: 13px;
  color: white;
}

#fileDownloads {
  width: 15%;
  height: 100px;
  top: 450px;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  left: 20px;
  border-left: thin solid grey;
  border-bottom: thick solid grey;
  border-right: thin solid grey;
  border-top: thick solid grey;
  background-color: rgba(20, 20, 20, 1);
  font-style: normal;
  font-size: 13px;
  color: white;
}

@media only screen and (max-width: 415px) {
  .accordion-root,
  #allClearToggles {
    width: 30%;
  }
}

.accordion-children {
  border-style: none;
}

.text-xl {
  font-size: 1rem;
}

.text-center {
  font-size: 13px;
}

.mb-3 {
  margin-bottom: 0.25rem;
}

.domain {
  border-style: none;
  width: 100px;
}

label {
  font-size: 13px;
}

.active {
  color: #3182ce;
}

#clearToggle {
  float: right;
  margin-right: 30%;
  text-decoration: underline;
}

#checkbox {
  margin-left: 10px;
}
</style>