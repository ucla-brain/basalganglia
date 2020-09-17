<template>
  <div id="topdiv">
    <div id="openseadragon" style="width: 100%; height: 600px;">
<multilevel-accordion :tree="tree" :marginLeft="2">
<div slot-scope="{ tree, expanded, leaf }">
  <div
    class="relative mb-3 border rounded-full cursor-pointer text-white"
    style="transition: box-shadow 0.5s, background-color 0.5s, color 0.5s; border-style:none;"
  >
  <input v-if="leaf" type="checkbox" :id="tree.text" :value="tree.text" @change="select(tree.text)">
  <label v-if="leaf" :for="tree.text">{{ tree.text }}</label>
    <p
      v-if="!leaf"
      class="domain relative text-left"
      style="top: 0.05rem; left: 10px; font-size: 13px;"
    >{{ expanded ? '−' : '+' }} {{ tree.text }}</p>
  </div>
  </div>
</multilevel-accordion>
      </div><!-- end of openseadragon -->
  </div> <!-- end of top div -->
</template>

<script>
import OpenSeadragon from "openseadragon";
import caseIds from "./data/caseIds.js";
import MultilevelAccordion from "vue-multilevel-accordion";


export default {
  components: {
      MultilevelAccordion
    },
  data() {
    return {
      githubPrefix: process.env.GITHUB_PREFIX,
      tree: caseIds,
      selectedLayers: []
    };
  },
  methods: {
      select(caseId) {
        const prefix = this.githubPrefix;
        const index = this.selectedLayers.indexOf(caseId);
        if (index > -1) {
          this.selectedLayers.splice(index, 1);
          let tileSources = [];
          this.selectedLayers.forEach(function(layer){
            let tileSource = "";
            if(!layer.includes(".dzi")){
              tileSource = prefix+"/static/output/"+layer+".dzi";
            }
            else{
              tileSource=layer;
            }
            tileSources.push(tileSource);
          });
          this.viewer.open(tileSources);
        }
        else{
          this.selectedLayers.push(caseId);
          this.viewer.addTiledImage({
            tileSource: prefix+"/static/output/"+caseId+".dzi"
          });
        }
      }
  },
  mounted() {
    this.selectedLayers = [this.githubPrefix+"/static/output/ara-whitebg.dzi"];
    this.viewer = OpenSeadragon({
      id: "openseadragon",
      prefixUrl: "/viewer/static/images/",
      tileSources: this.selectedLayers,
      showNavigator: true,
    });
  }
}
</script>

<style>
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
  border-top: thick solid grey;
  background-color: rgba(20,20,20,1);
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

</style>