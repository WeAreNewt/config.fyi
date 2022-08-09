import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { datadogRum } from '@datadog/browser-rum';

function MyApp({ Component, pageProps }: AppProps) {
  datadogRum.init({
    applicationId: process.env.DATADOG_APPLICATION_ID!,
    clientToken: process.env.DATADOG_CLIENT_TOKEN!,
    site: 'datadoghq.eu',
    service:'newt',
    env:'staging',
    sampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel:'mask-user-input'
  });

  datadogRum.startSessionReplayRecording();
  return( <Component {...pageProps} />)
}

export default MyApp
