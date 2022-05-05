import React from "react";
// @ts-ignore
import MarkdownExample from "./MarkdownSample.md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Typography } from "./Typography";
// @ts-ignore
import { Space } from "../../index";

const { Title, Link, Text } = Typography;

export default {
  title: "General/Text",
  component: Text,
};

export const article = () => (
  <Typography tag="article">
    <ReactMarkdown remarkPlugins={[remarkGfm]} children={MarkdownExample} />
  </Typography>
);

export const Titles = () => (
  <React.Fragment>
    <Title level={1}>Hello world</Title>
    <Title level={2}>Hello world</Title>
    <Title level={3}>Hello world</Title>
    <Title level={4}>Hello world</Title>
    <Title level={5}>Hello world</Title>
  </React.Fragment>
);

export const Texts = () => (
  <>
    <Text>Supabase UI (default)</Text>
    <br />
    <Text type="secondary">Supabase UI (secondary)</Text>
    <br />
    <Text type="success">Supabase UI (success)</Text>
    <br />
    <Text type="warning">Supabase UI (warning)</Text>
    <br />
    <Text type="danger">Supabase UI (danger)</Text>
    <br />
    <Text disabled>Supabase UI (disabled)</Text>
    <br />
    <Text mark>Supabase UI (mark)</Text>
    <br />
    <Text code>Supabase UI (code)</Text>
    <br />
    <Text keyboard>Supabase UI (keyboard)</Text>
    <br />
    <Text underline>Supabase UI (underline)</Text>
    <br />
    <Text strikethrough>Supabase UI (strikethrough)</Text>
    <br />
    <Text strong>Supabase UI (strong)</Text>
    <br />
    <Link href="https://supabase.io" target="_blank">
      Supabase (Link)
    </Link>
  </>
);
