import Scripts from '@/components/Scripts';
import PageChild from './PageChild';
const Home = () => {
  return (
    <>
      <head>
        <title>Intelliwriter.io: Best AI Image Generator & Free AI Writing</title>
        <meta name="description" content="Boost creativity with the best AI image generator & free AI writing tools. Explore 70+ innovative features!" />
        <meta name="google-site-verification" content="jOLdFKT4EB_AxoR8fQqHLckgsvnJ_Ta4WPY40UNfjwo" />
        <link rel="canonical" href="https://intelliwriter.io/" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNPNZ6PR');` }} />
      </head>

      <body className="relative">
        <PageChild />
        <Scripts />
      </body>
    </>
  )
}

export default Home