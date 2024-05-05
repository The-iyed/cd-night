import {StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import {WebViewSharedProps} from 'react-native-webview/lib/WebViewTypes';


export interface KatexOptions {
    displayMode?: boolean;
    output?: 'html' | 'mathml' | 'htmlAndMathml';
    leqno?: boolean;
    fleqn?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: any;
    minRuleThickness?: number;
    colorIsTextColor?: boolean;
    maxSize?: number;
    maxExpand?: number;
    strict?: boolean | string;
    trust?: boolean;
    globalGroup?: boolean;
}

export interface ContentOptions extends KatexOptions {
    inlineStyle?: string;
    expression?: string;
}

function getContent({inlineStyle, expression, ...options}: ContentOptions) {
    return `<!DOCTYPE html>
<html>
<head>
<style>
${inlineStyle}
</style>
<script>
</script>
</head>
<body>
</body>
</html>
`;
}

const defaultStyle = StyleSheet.create({
    root: {
        height: 40,
    },
});

const defaultInlineStyle = `
html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  margin: 0;
  display: flex;
}
`;

export interface KatexProps extends ContentOptions, Omit<WebViewSharedProps, 'source'> {
}

export function Katex({
                          displayMode,
                          output,
                          leqno,
                          fleqn,
                          throwOnError,
                          errorColor,
                          macros,
                          minRuleThickness,
                          colorIsTextColor,
                          maxSize,
                          maxExpand,
                          strict,
                          trust,
                          globalGroup,
                          ...webViewProps
                      }: KatexProps) {
    return <WebView
        {...webViewProps}
        source={{
            html: getContent({
                displayMode,
                output,
                leqno,
                fleqn,
                throwOnError,
                errorColor,
                macros,
                minRuleThickness,
                colorIsTextColor,
                maxSize,
                maxExpand,
                strict,
                trust,
                globalGroup,
            }),
        }}
    />;
}

Katex.defaultProps = {
    expression: '',
    displayMode: false,
    throwOnError: false,
    errorColor: '#f00',
    inlineStyle: defaultInlineStyle,
    style: defaultStyle,
    macros: {},
    colorIsTextColor: false,
};
