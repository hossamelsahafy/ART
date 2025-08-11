import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./src/app/i18n/request.ts");
const nextConfig = {
  images: {
    domains: ["medex-eg.com"],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(withNextIntl(nextConfig));
