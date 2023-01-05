"use strict";(self.webpackChunkui=self.webpackChunkui||[]).push([[9389],{"./src/Note/Note.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Note_stories});__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js");var theme=__webpack_require__("./src/theme/index.ts"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const Container=(0,theme.zo)("div",{position:"relative",width:"auto"}),StyledNote=(0,theme.zo)("div",{background:"#EDE8CD",borderRadius:"$md",display:"flex",alignItems:"center"}),StyledOverlay=(0,theme.zo)("div",{position:"absolute",top:"0px",bottom:"0px",right:"0px",left:"0px",backgroundImage:'url("https://res.cloudinary.com/film-it/image/upload/v1648261306/The%20inn/concrete-stylized.png")',backgroundRepeat:"no-repeat",mixBlendMode:"darken",opacity:.12,borderRadius:"6px"}),TextContainer=(0,theme.zo)("div",{padding:"$12"}),Note=({children})=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(StyledOverlay,{}),(0,jsx_runtime.jsx)(StyledNote,{children:(0,jsx_runtime.jsx)(TextContainer,{children})})]});Note.displayName="Note";try{Note.displayName="Note",Note.__docgenInfo={description:"",displayName:"Note",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Note/Note.tsx#Note"]={docgenInfo:Note.__docgenInfo,name:"Note",path:"src/Note/Note.tsx#Note"})}catch(__react_docgen_typescript_loader_error){}const Note_stories={title:"MGUI/Note",component:Note},Primary={args:{children:"“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”"},render:args=>(0,jsx_runtime.jsx)(Note,{...args,children:args.children})};Primary.parameters={...Primary.parameters,storySource:{source:'{\n  args: {\n    children: "“George is a fantastic GM.  He really knows the rules and helps beginners.  He always makes sure everyone I comfortable and having fun.  I love that he uses different voices for different NPCs.”"\n  },\n  render: args => {\n    return <Note {...args}>{args.children}</Note>;\n  }\n}',...Primary.parameters?.storySource}};const __namedExportsOrder=["Primary"]},"./src/theme/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{zo:()=>styled,rS:()=>theme});var colors=__webpack_require__("../../node_modules/.pnpm/@radix-ui+colors@0.1.8/node_modules/@radix-ui/colors/index.mjs"),dist=__webpack_require__("../../node_modules/.pnpm/@stitches+react@1.2.8_react@18.2.0/node_modules/@stitches/react/dist/index.mjs");const font_fonts={body:"system-ui, sans-serif",heading:"Georgia, serif",mono:"Menlo, monospace",sans:'"Alegreya Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',serif:'"Staatliches", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',oldfenris:"OldFenris",alegreyasans:"'Alegreya Sans'",trejan:"trajan-sans-pro, sans-serif",cinzel:'"Cinzel", serif'},font_fontSizes={xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem","6xl":"3.75rem","7xl":"4.5rem","8xl":"6rem","9xl":"8rem"},font_fontWeights={hairline:100,thin:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900},font_lineHeights={normal:"normal",none:1,shorter:1.25,short:1.375,base:1.5,tall:1.625,taller:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},font_letterSpacings={tighter:"-0.05em",tight:"-0.025em",normal:"0",wide:"0.025em",wider:"0.05em",widest:"0.1em"},spacing={space:{px:"1px",1:"0.125rem",2:"0.25rem",3:"0.375rem",4:"0.5rem",5:"0.625rem",6:"0.75rem",7:"0.875rem",8:"1rem",9:"1.25rem",10:"1.5rem",11:"1.75rem",12:"2rem",13:"2.25rem",14:"2.5rem",15:"3rem",16:"3.5rem",17:"4rem",18:"5rem",19:"6rem",20:"7rem",21:"8rem",22:"9rem",23:"10rem",24:"11rem",25:"12rem",26:"13rem",27:"14rem",28:"15rem",29:"16rem",30:"18rem",31:"20rem",32:"24rem"}},{config,css,styled,createTheme,theme}=(0,dist.Th)({theme:{colors:{yellowBrand:"#FFD166",orangeBrand:"#9f5e25",whiteBrand:"#fcfcfc",grayBrand:"#273435",lightBlackBrand:"hsl(0, 0%, 9%)",...colors.MA,...colors.iN,...colors.Q6,...colors.ek,...colors.er,...colors.ae,...colors.F9,...colors.U2,gold1:"#FFD166",gold2:"#FFD166",hiContrast:"$slate12",loContrast:"white"},space:spacing.space,fontSizes:{...font_fontSizes},fonts:{untitled:"Untitled Sans, apple-system, sans-serif",mono:"Söhne Mono, menlo, monospace",sans:font_fonts.sans,serif:font_fonts.serif,oldfenris:font_fonts.oldfenris,alegreyasans:font_fonts.alegreyasans,trejan:font_fonts.cinzel,cinzel:font_fonts.cinzel},fontWeights:{...font_fontWeights},lineHeights:{...font_lineHeights},letterSpacings:{...font_letterSpacings},sizes:{...spacing.space,max:"max-content",min:"min-content",full:"100%","3xs":"14rem","2xs":"16rem",xs:"20rem",sm:"24rem",base:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem","8xl":"90rem"},borderWidths:{0:0,1:"1px",2:"2px",4:"4px",8:"8px"},borderStyles:{solid:"solid",dashed:"dashed",dotted:"dotted",double:"double",hidden:"hidden",none:"none"},radii:{none:"0",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},shadows:{xs:"0 0 0 1px rgba(0, 0, 0, 0.05)",sm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",base:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",md:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",lg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 25px 50px -12px rgba(0, 0, 0, 0.25)",outline:"0 0 0 3px rgba(66, 153, 225, 0.6)",inner:"inset 0 2px 4px 0 rgba(0,0,0,0.06)",none:"none","dark-lg":"rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},utils:{p:value=>({padding:value}),pt:value=>({paddingTop:value}),pr:value=>({paddingRight:value}),pb:value=>({paddingBottom:value}),pl:value=>({paddingLeft:value}),px:value=>({paddingLeft:value,paddingRight:value}),py:value=>({paddingTop:value,paddingBottom:value}),m:value=>({margin:value}),mt:value=>({marginTop:value}),mr:value=>({marginRight:value}),mb:value=>({marginBottom:value}),ml:value=>({marginLeft:value}),mx:value=>({marginLeft:value,marginRight:value}),my:value=>({marginTop:value,marginBottom:value}),ta:value=>({textAlign:value}),fd:value=>({flexDirection:value}),fw:value=>({flexWrap:value}),ai:value=>({alignItems:value}),ac:value=>({alignContent:value}),jc:value=>({justifyContent:value}),as:value=>({alignSelf:value}),fg:value=>({flexGrow:value}),fs:value=>({flexShrink:value}),fb:value=>({flexBasis:value}),bc:value=>({backgroundColor:value}),br:value=>({borderRadius:value}),btrr:value=>({borderTopRightRadius:value}),bbrr:value=>({borderBottomRightRadius:value}),bblr:value=>({borderBottomLeftRadius:value}),btlr:value=>({borderTopLeftRadius:value}),bs:value=>({boxShadow:value}),lh:value=>({lineHeight:value}),ox:value=>({overflowX:value}),oy:value=>({overflowY:value}),pe:value=>({pointerEvents:value}),us:value=>({WebkitUserSelect:value,userSelect:value}),userSelect:value=>({WebkitUserSelect:value,userSelect:value}),size:value=>({width:value,height:value}),appearance:value=>({WebkitAppearance:value,appearance:value}),backgroundClip:value=>({WebkitBackgroundClip:value,backgroundClip:value})},media:{xs:"@media (min-width: 0px)",sm:"@media (min-width: 640px)",md:"@media (min-width: 768px)",lg:"@media (min-width: 1024px)",xl:"@media (min-width: 1280px)","2xl":"@media (min-width: 1536px)"}});createTheme({colors:{yellowBrand:"#FFD166",...colors.hU,...colors.qn,...colors.nA,...colors.u7,...colors.f3,...colors.L0}})}}]);