"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[4895],{"./src/Card/Card.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,SingleCard:()=>SingleCard,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Card_stories});var react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),theme=__webpack_require__("./src/theme/index.ts"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const StyledCardWrapper=(0,theme.zo)("article",{variants:{background:{dark:{borderRadius:"$radii$md",border:"3px solid transparent",backgroundOrigin:"border-box",backgroundClip:"content-box, border-box",backgroundImage:"linear-gradient(rgb(24,24,24), rgb(24,24,24)),linear-gradient($yellowBrand, $orangeBrand)"}},gold:{true:{borderRadius:"$radii$md",border:"3px solid transparent",backgroundOrigin:"border-box",backgroundClip:"content-box, border-box",backgroundImage:"linear-gradient(rgb(24,24,24), rgb(24,24,24)),linear-gradient($yellowBrand, $orangeBrand)"}}}}),CardSection=(0,theme.zo)("div",{p:"$space$8"}),CardImage=(0,theme.zo)("img",{objectFit:"cover",borderTopLeftRadius:"4px",borderTopRightRadius:"4px",variants:{gold:{true:{borderBottom:"3px solid transparent",backgroundOrigin:"border-box",backgroundClip:"content-box, border-box",backgroundImage:"linear-gradient(45deg,$yellowBrand, $orangeBrand),linear-gradient(45deg,$yellowBrand, $orangeBrand)"}}}}),Card=react.forwardRef((({children,gold,...props},ref)=>(0,jsx_runtime.jsx)(StyledCardWrapper,{ref,gold,...props,children})));Card.displayName="Card";try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{gold:{defaultValue:null,description:"",name:"gold",required:!1,type:{name:"boolean"}},background:{defaultValue:null,description:"",name:"background",required:!1,type:{name:"enum",value:[{value:'"dark"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Card/Card.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"src/Card/Card.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}var Text=__webpack_require__("./src/Typography/Text.tsx"),Header=__webpack_require__("./src/Typography/Header.tsx"),Tag=__webpack_require__("./src/Tag/Tag.tsx");const campaigns=[{name:"Living World Campaign: The Monster Slayer's Guild",gameSystem:"Dungeon & Dragons 5e",partySize:6,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["Action","Comedy","VVT"],imageURL:"https://cdnb.artstation.com/p/assets/images/images/053/245/783/4k/envar-studio-06fr012-wizenedsmith-1.jpg?1661780033"},{name:"Ornn's Forge",gameSystem:"Pathfinder 2E",partySize:6,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["Action","Comedy","VVT"],imageURL:"https://cdnb.artstation.com/p/assets/images/images/053/287/239/4k/envar-studio-ornnsforge-final.jpg?1661868325"},{name:"SPELLJAMMER One-Shot: Catching the Astral Tide (Spelljammer race",gameSystem:"Star Wars Fantasy Gaming",partySize:4,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["One shot","Dungeons & Dragons 5e","Zoom"],imageURL:"https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2F0f9f6aa5-a6dd-42d4-8b61-ae14d8ec9e4a&w=3840&q=75"},{name:"The Alchemist - Dungeon Exploration - One Shot",gameSystem:"Dungeons & Dragons 5e",partySize:4,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["One shot","Dungeons & Dragons 5e","Zoom","Fantasy Grounds"],imageURL:"https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2Fceb14f21-5d4f-4518-81fb-3ce5d00dce86&w=3840&q=75"},{name:"Secrets of Saltmarsh",gameSystem:"Dungeon & Dragons 5e",partySize:6,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["Action","Comedy","VVT"],imageURL:"https://cdnb.artstation.com/p/assets/images/images/053/351/543/large/sun-gy-1.jpg?1662000171"},{name:"The Pub Quiz Dungeon: Dante's Tomb of Dastardly Trivia and Terrible Death",gameSystem:"Pathfinder 2E",partySize:6,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["Action","Comedy","VVT"],imageURL:"https://cdna.artstation.com/p/assets/images/images/053/279/648/large/liang-mark-final-render2.jpg?1661855705"},{name:"The Gems of Kalathos-Begining DnD Campaign",gameSystem:"Star Wars Fantasy Gaming",partySize:4,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["One shot","Dungeons & Dragons 5e","Zoom"],imageURL:"https://cdnb.artstation.com/p/assets/images/images/053/338/243/4k/dmitry-prozorov-death-knights-4k.jpg?1661969561"},{name:"Baldur's Gate: Descent into Avernus - Level 5",gameSystem:"Dungeons & Dragons 5e",partySize:4,members:[{name:"John Doe"},{name:"John Doe"},{name:"John Doe"}],startDate:"Tuesday, January 11 at 16:00",tags:["One shot","Dungeons & Dragons 5e","Zoom","Fantasy Grounds"],imageURL:"https://startplaying.games/_next/image?url=https%3A%2F%2Fspg-images.s3.us-west-1.amazonaws.com%2F0374aea3-8b52-4265-962f-b00d5cb5d581&w=3840&q=75"}],StyledText=(0,theme.zo)(Text.x,{margin:"0 0px",lineHeight:"$lineHeights$tall",color:"#666",whiteSpace:"nowrap"}),Card_stories={title:"MGUI/Card",component:Card},Primary={args:{background:"dark",gold:!0},render:args=>(0,jsx_runtime.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"1rem"},children:campaigns.map((campaign=>(0,jsx_runtime.jsx)("div",{style:{maxWidth:"275px"},children:(0,jsx_runtime.jsxs)(Card,{...args,style:{display:"flex",flexDirection:"column",height:"100%"},children:[(0,jsx_runtime.jsx)(CardImage,{gold:args.gold,width:"100%",height:"175px",src:campaign.imageURL}),(0,jsx_runtime.jsxs)(CardSection,{style:{flex:1},children:[(0,jsx_runtime.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,jsx_runtime.jsx)(StyledText,{size:"sm",weight:"medium",children:campaign.gameSystem}),(0,jsx_runtime.jsxs)(StyledText,{size:"sm",weight:"medium",children:[campaign.members.length," out of ",campaign.partySize," Players"]})]}),(0,jsx_runtime.jsx)(Header.h,{size:"xl",children:campaign.name}),(0,jsx_runtime.jsx)(StyledText,{size:"sm",children:campaign.startDate}),(0,jsx_runtime.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:campaign.tags.map((tag=>(0,jsx_runtime.jsx)(Tag.V,{children:tag},tag)))})]})]})},campaign.name)))})},SingleCard={render:()=>(0,jsx_runtime.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"1rem"},children:[campaigns[0]].map((campaign=>(0,jsx_runtime.jsx)("div",{style:{maxWidth:"275px"},children:(0,jsx_runtime.jsxs)(Card,{style:{display:"flex",flexDirection:"column",height:"100%"},children:[(0,jsx_runtime.jsx)(CardImage,{gold:!0,width:"100%",height:"175px",src:campaign.imageURL}),(0,jsx_runtime.jsxs)(CardSection,{style:{flex:1},children:[(0,jsx_runtime.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,jsx_runtime.jsx)(StyledText,{size:"sm",weight:"medium",children:campaign.gameSystem}),(0,jsx_runtime.jsxs)(StyledText,{size:"sm",weight:"medium",children:[campaign.members.length," out of ",campaign.partySize," Players"]})]}),(0,jsx_runtime.jsx)(Header.h,{size:"xl",children:campaign.name}),(0,jsx_runtime.jsx)(StyledText,{size:"sm",children:campaign.startDate}),(0,jsx_runtime.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:campaign.tags.map((tag=>(0,jsx_runtime.jsx)(Tag.V,{children:tag},tag)))})]})]})},campaign.name)))})};Primary.parameters={...Primary.parameters,storySource:{source:'{\n  args: {\n    background: "dark",\n    gold: true\n  },\n  render: args => <div style={{\n    display: "grid",\n    gridTemplateColumns: "repeat(4, 1fr)",\n    gap: "1rem"\n  }}>\r\n      {campaigns.map(campaign => <div style={{\n      maxWidth: "275px"\n    }} key={campaign.name}>\r\n          <Card {...args} style={{\n        display: "flex",\n        flexDirection: "column",\n        height: "100%"\n      }}>\r\n            <CardImage gold={args.gold} width="100%" height="175px" src={campaign.imageURL} />\r\n\r\n            <CardSection style={{\n          flex: 1\n        }}>\r\n              <div style={{\n            display: "flex",\n            flexDirection: "column"\n          }}>\r\n                <StyledText size="sm" weight="medium">\r\n                  {campaign.gameSystem}\r\n                </StyledText>\r\n                <StyledText size="sm" weight="medium">\r\n                  {campaign.members.length} out of {campaign.partySize} Players\r\n                </StyledText>\r\n              </div>\r\n              <Header size="xl">{campaign.name}</Header>\r\n              <StyledText size="sm">{campaign.startDate}</StyledText>\r\n              <div style={{\n            display: "flex",\n            flexWrap: "wrap"\n          }}>\r\n                {campaign.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}\r\n              </div>\r\n            </CardSection>\r\n          </Card>\r\n        </div>)}\r\n    </div>\n}',...Primary.parameters?.storySource}},SingleCard.parameters={...SingleCard.parameters,storySource:{source:'{\n  render: () => <div style={{\n    display: "grid",\n    gridTemplateColumns: "repeat(4, 1fr)",\n    gap: "1rem"\n  }}>\r\n      {[campaigns[0]].map(campaign => <div style={{\n      maxWidth: "275px"\n    }} key={campaign.name}>\r\n          <Card style={{\n        display: "flex",\n        flexDirection: "column",\n        height: "100%"\n      }}>\r\n            <CardImage gold width="100%" height="175px" src={campaign.imageURL} />\r\n\r\n            <CardSection style={{\n          flex: 1\n        }}>\r\n              <div style={{\n            display: "flex",\n            flexDirection: "column"\n          }}>\r\n                <StyledText size="sm" weight="medium">\r\n                  {campaign.gameSystem}\r\n                </StyledText>\r\n                <StyledText size="sm" weight="medium">\r\n                  {campaign.members.length} out of {campaign.partySize} Players\r\n                </StyledText>\r\n              </div>\r\n              <Header size="xl">{campaign.name}</Header>\r\n              <StyledText size="sm">{campaign.startDate}</StyledText>\r\n              <div style={{\n            display: "flex",\n            flexWrap: "wrap"\n          }}>\r\n                {campaign.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}\r\n              </div>\r\n            </CardSection>\r\n          </Card>\r\n        </div>)}\r\n    </div>\n}',...SingleCard.parameters?.storySource}};const __namedExportsOrder=["Primary","SingleCard"]},"./src/Tag/Tag.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>Tag});var _radix_ui_colors__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/.pnpm/@radix-ui+colors@0.1.8/node_modules/@radix-ui/colors/index.mjs"),_theme__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),__webpack_require__("./src/theme/index.ts")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const StyledTag=(0,_theme__WEBPACK_IMPORTED_MODULE_2__.zo)("div",{display:"inline-flex",borderRadius:4,backgroundColor:"$yellowBrand",color:_radix_ui_colors__WEBPACK_IMPORTED_MODULE_3__.U2.blackA12,padding:"$space$4",fontSize:"$fontSizes$xs",fontFamily:"Inter",whiteSpace:"nowrap",margin:"$space$4 $space$4 $space$4 0px"}),Tag=({children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledTag,{...props,children});Tag.displayName="Tag";try{Tag.displayName="Tag",Tag.__docgenInfo={description:"",displayName:"Tag",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string; }, { colors: { hiContrast: string; loContrast: string; gold1: string; gold2: string; blackA1: string; blackA2: string; blackA3: string; ... 97 more ...; lightBlackBrand: string; }; ... 11 more ...; zIndices: { ...; }; }, DefaultThemeMap...'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Tag/Tag.tsx#Tag"]={docgenInfo:Tag.__docgenInfo,name:"Tag",path:"src/Tag/Tag.tsx#Tag"})}catch(__react_docgen_typescript_loader_error){}},"./src/Typography/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>Header});var _Text__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Typography/Text.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const Header=({size="base",as="h1",color="loContrast",className,children})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Text__WEBPACK_IMPORTED_MODULE_1__.x,{as,size,color,className,children});Header.displayName="Header";try{Header.displayName="Header",Header.__docgenInfo={description:"",displayName:"Header",props:{size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"base"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'},{value:'"3xl"'},{value:'"4xl"'},{value:'"5xl"'},{value:'"6xl"'},{value:'"7xl"'}]}},as:{defaultValue:{value:"h1"},description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"p"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"h7"'},{value:'"a"'}]}},color:{defaultValue:{value:"loContrast"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"red"'},{value:'"crimson"'},{value:'"pink"'},{value:'"purple"'},{value:'"violet"'},{value:'"indigo"'},{value:'"blue"'},{value:'"cyan"'},{value:'"teal"'},{value:'"green"'},{value:'"lime"'},{value:'"yellow"'},{value:'"yellow2"'},{value:'"yellowBrand"'},{value:'"orange"'},{value:'"gold"'},{value:'"bronze"'},{value:'"gray"'},{value:'"hiContrast"'},{value:'"loContrast"'},{value:'"lightContrast"'}]}},font:{defaultValue:null,description:"",name:"font",required:!1,type:{name:"TransformProps<unknown, unknown>"}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"TransformProps<unknown, unknown>"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Typography/Header.tsx#Header"]={docgenInfo:Header.__docgenInfo,name:"Header",path:"src/Typography/Header.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}},"./src/Typography/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>Text});var _theme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/theme/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const StyledText=(0,_theme__WEBPACK_IMPORTED_MODULE_1__.zo)("span",{variants:{size:{xs:{fontSize:"$fontSizes$xs",lineHeight:"$lineHeights$none"},sm:{fontSize:"$fontSizes$sm",lineHeight:"$lineHeights$shorter"},base:{fontSize:"$fontSizes$base",lineHeight:"$lineHeights$base"},lg:{fontSize:"$fontSizes$lg",lineHeight:"$lineHeights$7"},xl:{fontSize:"$fontSizes$xl",lineHeight:"$lineHeights$7"},"2xl":{fontSize:"$fontSizes$2xl",lineHeight:"$lineHeights$taller"},"3xl":{fontSize:"$fontSizes$3xl",lineHeight:"$lineHeights$9"},"4xl":{fontSize:"$fontSizes$4xl",lineHeight:"$lineHeights$10"},"5xl":{fontSize:"$fontSizes$5xl",lineHeight:"$lineHeights$none"},"6xl":{fontSize:"$fontSizes$6xl",lineHeight:"$lineHeights$none"},"7xl":{fontSize:"$fontSizes$7xl",lineHeight:"$lineHeights$none"}},color:{red:{color:"$red11"},crimson:{color:"$crimson11"},pink:{color:"$pink11"},purple:{color:"$purple11"},violet:{color:"$violet11"},indigo:{color:"$indigo11"},blue:{color:"$blue11"},cyan:{color:"$cyan11"},teal:{color:"$teal11"},green:{color:"$green11"},lime:{color:"$lime11"},yellow:{color:"$yellow11"},yellow2:{color:"$yellow12"},yellowBrand:{color:"$yellowBrand"},orange:{color:"$orange11"},gold:{color:"$gold1"},bronze:{color:"$bronze11"},gray:{color:"$slate11"},hiContrast:{color:"$hiContrast"},loContrast:{color:"$loContrast"},lightContrast:{color:"rgb(237, 232, 205)"}},font:{mono:{fontFamiiy:"$fonts$mono"},serif:{fontFamiiy:"$fonts$serif"},sans:{fontFamiiy:"$fonts$sans"},untitled:{fontFamiiy:"$fonts$untitled"},trejan:{fontFamiiy:"$fonts$trejan"},alegreyasans:{fontFamiiy:"$fonts$alegreyasans"},cinzel:{fontFamily:"$fonts$cinzel"},oldfenris:{fontFamiiy:"$fonts$oldfenris"}},weight:{hairline:{fontWeight:"$fontWeghts$hairline"},thin:{fontWeight:"$fontWeghts$thin"},light:{fontWeight:"$fontWeghts$light"},normal:{fontWeight:"$fontWeghts$normal"},medium:{fontWeight:"$fontWeghts$medium"},semibold:{fontWeight:"$fontWeghts$semibold"},bold:{fontWeight:"$fontWeghts$bold"},extrabold:{fontWeight:"$fontWeghts$extrabold"},black:{fontWeight:"$fontWeghts$black"}}},defaultVariants:{size:"base",color:"loContrast"}}),Text=({size,as="p",weight="normal",color="loContrast",style,className,font,children})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StyledText,{as,size,color,font,weight,style,className,children});Text.displayName="Text";try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"base"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'},{value:'"3xl"'},{value:'"4xl"'},{value:'"5xl"'},{value:'"6xl"'},{value:'"7xl"'}]}},as:{defaultValue:{value:"p"},description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"p"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"h7"'},{value:'"a"'}]}},color:{defaultValue:{value:"loContrast"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"red"'},{value:'"crimson"'},{value:'"pink"'},{value:'"purple"'},{value:'"violet"'},{value:'"indigo"'},{value:'"blue"'},{value:'"cyan"'},{value:'"teal"'},{value:'"green"'},{value:'"lime"'},{value:'"yellow"'},{value:'"yellow2"'},{value:'"yellowBrand"'},{value:'"orange"'},{value:'"gold"'},{value:'"bronze"'},{value:'"gray"'},{value:'"hiContrast"'},{value:'"loContrast"'},{value:'"lightContrast"'}]}},font:{defaultValue:null,description:"",name:"font",required:!1,type:{name:"TransformProps<unknown, unknown>"}},weight:{defaultValue:{value:"normal"},description:"",name:"weight",required:!1,type:{name:"TransformProps<unknown, unknown>"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Typography/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/Typography/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/theme/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{zo:()=>styled,rS:()=>theme});var colors=__webpack_require__("../../node_modules/.pnpm/@radix-ui+colors@0.1.8/node_modules/@radix-ui/colors/index.mjs"),dist=__webpack_require__("../../node_modules/.pnpm/@stitches+react@1.2.8_react@18.2.0/node_modules/@stitches/react/dist/index.mjs");const font_fonts={body:"system-ui, sans-serif",heading:"Georgia, serif",mono:"Menlo, monospace",sans:'"Alegreya Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',serif:'"Staatliches", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',oldfenris:"OldFenris",alegreyasans:"'Alegreya Sans'",trejan:"trajan-sans-pro, sans-serif",cinzel:'"Cinzel", serif'},font_fontSizes={xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},font_fontWeights={hairline:100,thin:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},font_lineHeights={normal:"normal",none:1,shorter:1.25,short:1.375,base:1.5,tall:1.625,taller:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},font_letterSpacings={tighter:"-0.05em",tight:"-0.025em",normal:"0",wide:"0.025em",wider:"0.05em",widest:"0.1em"},spacing={space:{px:"1px",1:"0.125rem",2:"0.25rem",3:"0.375rem",4:"0.5rem",5:"0.625rem",6:"0.75rem",7:"0.875rem",8:"1rem",9:"1.25rem",10:"1.5rem",11:"1.75rem",12:"2rem",13:"2.25rem",14:"2.5rem",15:"3rem",16:"3.5rem",17:"4rem",18:"5rem",19:"6rem",20:"7rem",21:"8rem",22:"9rem",23:"10rem",24:"11rem",25:"12rem",26:"13rem",27:"14rem",28:"15rem",29:"16rem",30:"18rem",31:"20rem",32:"24rem"}},{config,css,styled,createTheme,theme}=(0,dist.Th)({theme:{colors:{yellowBrand:"#FFD166",orangeBrand:"#9f5e25",whiteBrand:"#fcfcfc",grayBrand:"#273435",lightBlackBrand:"hsl(0, 0%, 9%)",...colors.MA,...colors.iN,...colors.Q6,...colors.ek,...colors.er,...colors.ae,...colors.F9,...colors.U2,gold1:"#FFD166",gold2:"#FFD166",hiContrast:"$slate12",loContrast:"white"},space:spacing.space,fontSizes:{...font_fontSizes},fonts:{untitled:"Untitled Sans, apple-system, sans-serif",mono:"Söhne Mono, menlo, monospace",sans:font_fonts.sans,serif:font_fonts.serif,oldfenris:font_fonts.oldfenris,alegreyasans:font_fonts.alegreyasans,trejan:font_fonts.cinzel,cinzel:font_fonts.cinzel},fontWeights:{...font_fontWeights},lineHeights:{...font_lineHeights},letterSpacings:{...font_letterSpacings},sizes:{...spacing.space,max:"max-content",min:"min-content",full:"100%","3xs":"14rem","2xs":"16rem",xs:"20rem",sm:"24rem",base:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem","8xl":"90rem"},borderWidths:{0:0,1:"1px",2:"2px",4:"4px",8:"8px"},borderStyles:{solid:"solid",dashed:"dashed",dotted:"dotted",double:"double",hidden:"hidden",none:"none"},radii:{none:"0",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},shadows:{xs:"0 0 0 1px rgba(0, 0, 0, 0.05)",sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",base:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",outline:"0 0 0 3px rgba(66, 153, 225, 0.6)",inner:"inset 0 2px 4px 0 rgba(0,0,0,0.06)",none:"none","dark-lg":"rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},utils:{p:value=>({padding:value}),pt:value=>({paddingTop:value}),pr:value=>({paddingRight:value}),pb:value=>({paddingBottom:value}),pl:value=>({paddingLeft:value}),px:value=>({paddingLeft:value,paddingRight:value}),py:value=>({paddingTop:value,paddingBottom:value}),m:value=>({margin:value}),mt:value=>({marginTop:value}),mr:value=>({marginRight:value}),mb:value=>({marginBottom:value}),ml:value=>({marginLeft:value}),mx:value=>({marginLeft:value,marginRight:value}),my:value=>({marginTop:value,marginBottom:value}),ta:value=>({textAlign:value}),fd:value=>({flexDirection:value}),fw:value=>({flexWrap:value}),ai:value=>({alignItems:value}),ac:value=>({alignContent:value}),jc:value=>({justifyContent:value}),as:value=>({alignSelf:value}),fg:value=>({flexGrow:value}),fs:value=>({flexShrink:value}),fb:value=>({flexBasis:value}),bc:value=>({backgroundColor:value}),br:value=>({borderRadius:value}),btrr:value=>({borderTopRightRadius:value}),bbrr:value=>({borderBottomRightRadius:value}),bblr:value=>({borderBottomLeftRadius:value}),btlr:value=>({borderTopLeftRadius:value}),bs:value=>({boxShadow:value}),lh:value=>({lineHeight:value}),ox:value=>({overflowX:value}),oy:value=>({overflowY:value}),pe:value=>({pointerEvents:value}),us:value=>({WebkitUserSelect:value,userSelect:value}),userSelect:value=>({WebkitUserSelect:value,userSelect:value}),size:value=>({width:value,height:value}),appearance:value=>({WebkitAppearance:value,appearance:value}),backgroundClip:value=>({WebkitBackgroundClip:value,backgroundClip:value})},media:{xs:"@media (min-width: 0px)",sm:"@media (min-width: 640px)",md:"@media (min-width: 768px)",lg:"@media (min-width: 1024px)",xl:"@media (min-width: 1280px)","2xl":"@media (min-width: 1536px)"}});createTheme({colors:{yellowBrand:"#FFD166",...colors.hU,...colors.qn,...colors.nA,...colors.u7,...colors.f3,...colors.L0}})}}]);