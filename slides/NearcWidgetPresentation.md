## Custom Widget Development
<!-- .slide: data-background="#699876" -->
Making Sense of Map Widgets in  
ArcGIS Javascript API 4.0+  


---

<!-- .slide: data-background="#ad8174" -->
<img src="https://arcgisportal-dev.terracon.com/portal/sharing/rest/content/items/18dd677827314bd4ad7b0cea91c33abc/data" style="background:none; border:none; box-shadow:none;">

Fall NEARC Presentation 2018

*Stephen Patterson*  
*Application Developer*  
*Portsmouth, NH*  

---

<!-- .slide: data-background-iframe="https://www.terracon.com/locations/" -->

---

## What is a widget?
<!-- .slide: data-background="images/blank.gif" -->

---

<!-- .slide: data-background="#ad8174" -->
<img src="images/Inspector_Gadget_Thinking.png" style="background:none; border:none; box-shadow:none;">

---

### No...  
<!-- {_class="fragment fade-out" data-fragment-index="0"} -->
That is Inspector Gadget  
<!-- {_class="fragment fade-out" data-fragment-index="1"} -->


---

<p style="font-size:55px;">ESRI says widgets are...</p>
<p style="font-size:35px;">Reusable user-interface components and are key to providing a rich user experience. The ArcGIS for JavaScript API provides a set of ready-to-use widgets. Beginning with version 4.2, it also provides a foundation for you to create custom widgets.
</p>
<p style="font-size:15px;">*ESRI (2018, October 10). Widget development. Retrieved from https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html*<p>

---

#### Terracon is on that widget game
<!-- .slide: data-background="#ad8174" -->
<!-- <iframe style="height:500px;width:1500px;" src="https://stage.gis.terracon.com/GIS010/projects_overview/?project=GIS010_projects_overview"></iframe> -->
<p style="font-size:35px;">We have created a few widgets for our project viewer application</p>
<div style="font-size:27px;text-align: left;">
    <li style="text-indent:2em;">Basemap Gallery</li>
    <li style="text-indent:2em;">Loading Icon</li>
    <li style="text-indent:2em;">Measure Tool</li>
    <li style="text-indent:2em;">Annotation Tool</li>
    <li style="text-indent:2em;">Pointer Location</li>
    <li style="text-indent:2em;">Bookmarks</li>
</div>

--

## Basemap Gallery
<!-- .slide: data-background="#ad8174" -->
<img src="images/Basemap_Gallery.GIF">

--

## Loading Icon
<!-- .slide: data-background="#ad8174" -->
<img style="height:300px;width:600px;" src="images/Loading_Icon.GIF">

--

## Measure Tool
<!-- .slide: data-background="#ad8174" -->
<img src="images/Measure_Tool.GIF">

--

## Annotation Tool
<!-- .slide: data-background="#ad8174" -->
<img src="images/Annotation_Tool.GIF">

--

## Pointer Location
<!-- .slide: data-background="#ad8174" -->
<img src="images/Pointer_Location.GIF">

--

## Bookmarks
<!-- .slide: data-background="#ad8174" -->
<img src="images/Bookmarks.GIF">

---

#### Widgets are written with Typescript
<!-- .slide: data-background="#699876" -->
<ul>
    <li style="font-size:27px;text-align: left;">Typescript is a static typed superset of Javascript that compiles to Javascript</li>
    <li style="font-size:27px;text-align: left;">Compiling, Transpiling, more words to learn</li>
    <li style="font-size:27px;text-align: left;">Widget files are saved as ".tsx", which is a JSX format</li>
    <li style="font-size:27px;text-align: left;">Typescript has its own compiler that is called from the command line with the command "tsc"</li>
    <li style="font-size:27px;text-align: left;">You can also use other modern compilers/transpilers, such as *babel-loader*, or some combination of webpack, babel, grunt, etc.</li>
    <li style="font-size:27px;text-align: left;">The point is to convert Typescript or ES6 code to ES5(Vanilla JS) type of code</li>
</ul>

---

#### Typescript Requirements
<!-- .slide: data-background="#699876" -->
```javascript
/**
 * tsconfig.json
 */
{
    "compilerOptions": {
        "module": "amd",
        "removeComments": true,
        "noImplicitAny": true,
        "jsx": "react",
        "jsxFactory": "tsx",
        "experimentalDecorators": true,
        "preserveConstEnums": true,
        "suppressImplicitAnyIndexErrors": true,
        "outDir": "bv2/built",
        "rootDir": "bv2/js",
        "allowJs": true,
        "target": "es5"
    },
    "include": [
        "bv2/js/**/*",
    ],
    "exclude": [
    ]
}

```

<p style="font-size:30px;">Open command line in tsconfig.json directory and run "tsc"</p>

---

## Basic widget ".tsx" file
<!-- .slide: data-background="#b54444" --> 
```javascript
/**
 * Typescript directives required for development
 */
/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

/**
 * Import your objects for inheritence
 */
import Widget = require("esri/widgets/Widget");
import { subclass, declared, property } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";

/**
 * Import any ArcGIS API objects you will use
 */
import watchUtils = require("esri/core/watchUtils");
import MapView = require("esri/views/MapView");
import Map = require("esri/Map");

/**
 * Custom widgets are extended from the Widget base class
 */
@subclass("esri.widgets.CustomWidget")
class CustomWidget extends declared(Widget){
    @property()
    map: Map;

    @property()
    view: MapView;

    constructor(args: any) {
        super(args);
        this.view = args.view;
	    this.map = args.map;
    }

    /**
     * Default function for setting up the widget before UI is created
     */
    postInitialize() {
	}

    /**
     * Main function for building the UI of the widget and styling
     * @returns html UI elements for widget
     */
	render() {
	    const widget_styles = {
            "display": "block",
            "width": "50px",
            "height": "50px",
            "background": "white",
            "-moz-border-radius": "40px",
            "-webkit-border-radius": "40px",
            "background-image": 'url("/bv2/img/color_circle.gif")',
            "background-position":"50% 50%",
            "background-repeat":"no-repeat",
            "background-size": "150% 150%"
        };

        return (
            <div
                id="customWidget"
                title = "I'm a widget!!"
                styles={widget_styles}
                bind={this}
                class="widgety">
            </div>
        );
	}
}

/**
 * Export the new Widget at the end
 */
export = CustomWidget;
```

---

## Instantiating a Widget
<!-- .slide: data-background="#b54444" --> 

<span style="color: #f2cf4a; font-family: Babas; font-size: 12px;"></span>
```javascript
define([
        "dojo/_base/declare",
        "localjs/widgets/CustomWidget",
    ],
        function(
            declare,
            CustomWidget,
    )
    {
        return declare(null, {
            constructor: function(args) {
                this.mapPane = args.mapPane;
                this.mapView = args.mapView;
                this.initCustomWidget();
            },

            /**
             * Function to create a widget and add it to the map's UI
             */
            initCustomWidget: function() {
                let customWidget = new CustomWidget({
                    view: this.mapView,
                    map: this.mapPane.map
                });

                this.mapView.ui.add({
                    component: customWidget,
                    position: "bottom-left",
                    index: 1
                })
            }
        });
    }
);
```

---

<!-- .slide: data-background="#699876" -->
# Time for a Demo

---

> Thank you for attending.

Questions?  
<br>
<p style="font-size:28px;">Contact me</p>
<p style="font-size:28px;font-style: italic;">Stephen.Patterson@terracon.com</p>
