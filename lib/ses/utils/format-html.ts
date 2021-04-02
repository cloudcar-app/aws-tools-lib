/* eslint-disable max-len */

/**
 * return an accumulated formatted html. the function receives an attribute of the template data, which is of type array, in order to repeatedly format the same piece of html template with the different elements of the list.
 */
const formatNestedHtml = (
  key: string,
  templateData: Object,
  htmlToFormat: string,
) => {
  let formattedHtmlAfterLoops = '';
  templateData[key].forEach((element: Object) => {
    let htmlOfLoop = htmlToFormat;
    Object.keys(element).forEach((nestedKey) => {
      htmlOfLoop = htmlOfLoop.replace(`{{${nestedKey}}}`, element[nestedKey]);
    });
    formattedHtmlAfterLoops += htmlOfLoop;
  });
  return formattedHtmlAfterLoops;
};

/**
 * return a formatted html. the function receives an html and an object with attributes to format within the html. the attributes whose value is type string are replaced in the occurrences in the html that contain the name of the attribute of the form {{attributeName}}. In case of wanting to format a list, the attribute is replaced in the appearance {{#each attributeName}}
 */
const formatHtml = (htmlTemplate: string, templateData: Object) => {
  let formattedHtml = htmlTemplate;
  Object.keys(templateData).forEach((key) => {
    if (typeof templateData[key] === 'string') {
      formattedHtml = formattedHtml.replace(`{{${key}}}`, templateData[key]);
    }
    if (Array.isArray(templateData[key])) {
      const start = `{{#each ${key}}}`;
      const end = '{{/each}}';
      const htmlToFormat = formattedHtml.split(start)[1].split(end)[0];
      const nestedFormattedHtml = formatNestedHtml(
        key,
        templateData,
        htmlToFormat,
      );
      formattedHtml = formattedHtml.replace(
        start + htmlToFormat + end,
        nestedFormattedHtml,
      );
    }
  });
  return formattedHtml;
};

export default formatHtml;
