import { redirect } from 'next/navigation';
import { fallbackLng } from '../i18n/settings';

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${fallbackLng}`} />
      </head>
      <body>
        <script dangerouslySetInnerHTML={ {__html: `window.location.href = '/${fallbackLng}';`} } />
      </body>
    </html>
  );
}
