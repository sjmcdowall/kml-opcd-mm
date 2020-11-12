/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const kmlLayers = {
  a: {
    name: "Mile Markers",
    url:
      "https://raw.githubusercontent.com/sjmcdowall/kml-opcd-mm/main/Mile_Markers.kml",
    layer: null,
    map: null,
  },
};

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 12,
      center: { lat: 29.9630728, lng: -90.0940808 },
    }
  );

  // Create the possible KML layers
  for (const prop in kmlLayers) {
    const layer = new google.maps.KmlLayer({
      url: kmlLayers[prop].url,
      preserveViewport: true,
      // suppressInfoWindows: true,
    });

    kmlLayers[prop].layer = layer;
    kmlLayers[prop].map = map;
  }

  // const kmlLayer = new google.maps.KmlLayer({
  //   url: "https://github.com/sjmcdowall/kml-opcd-mm/raw/main/Mile_Markers.kml",
  //   // suppressInfoWindows: true,
  //   map: map,
  // });

  //   kmlLayer.addListener("click", (kmlEvent) => {
  //     const text = kmlEvent.featureData.description;
  //     showInContentWindow(text);
  //   });;

  function showInContentWindow(text: string) {
    const sidebar = document.getElementById("sidebar") as HTMLElement;
    sidebar.innerHTML = text;
  }

  // create the controls dynamically because it's easier, really
  function createTogglers() {
    let html = `<form><ul style="list-style: none; margin=0; padding=0;">`;
    for (const prop in kmlLayers) {
      html +=
        '<li id="selector-' +
        prop +
        "\"><input type='checkbox' id='" +
        prop +
        "'" +
        " onclick='highlight(this,\"selector-" +
        prop +
        "\"); toggleKML(this.checked, this.id)' />" +
        kmlLayers[prop].name +
        "</li>";
    }
    html +=
      // "<li class='control'><a href='#' onclick='removeAll(); return false;'>" +
      // "Remove all layers</a></li>" +
      "</ul></form>";

    document.getElementById("toggle_box").innerHTML = html;
  }

  // Create the togglers
  createTogglers();
}

// // easy way to remove all objects
// function removeAll(): void {
//   for (const prop in kmlLayers) {
//     if (kmlLayers[prop].obj) {
//       kmlLayers[prop].obj.setMap(null);
//       delete kmlLayers[prop].obj;
//     }
//   }
// }

// easy way to remove all objects
function removeAll(): void {
  for (const prop in kmlLayers) {
    if (kmlLayers[prop].layer) {
      kmlLayers[prop].layer.setMap(null);
      // delete kmlLayers[prop].obj;
    }
  }
}

// Append Class on Select
function highlight(box: HTMLInputElement, listitem: string): void {
  console.log("highlight invoked");
  const selected = "selected";
  const normal = "normal";
  document.getElementById(listitem).className = box.checked ? selected : normal;
}

// the important function... kml[id].xxxxx refers back to the top
function toggleKML(checked: boolean, id: string): void {
  console.log("toggleKML ", checked, id);
  if (checked) {
    // const layer = new google.maps.KmlLayer({
    //   url: kmlLayers[id].url,
    //   preserveViewport: true,
    //   suppressInfoWindows: true,
    // });

    // store kml as obj
    // kmlLayers[id].obj = layer;
    kmlLayers[id].layer.setMap(kmlLayers[id].map);
  } else {
    kmlLayers[id].layer.setMap(null);
    // delete kmlLayers[id].obj;
  }
}

export { initMap, highlight, toggleKML, removeAll, kmlLayers };

import "./style.css"; // required for webpack
