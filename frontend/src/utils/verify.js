/**
 * Verify Util
 * @author CamWang
 * @description generates rules for vuetify form verification
 * @exports object an object that each property named as eg.
 *    "ruleInputname", roleInputname is an array of test functions
 *    that can be passin to vuetify that can be used to verify the 
 *    input called [inputname].
 */
import i18n from "@/locale";

/**
 * Rules
 * @description define the rules for each input. This will be used to 
 *      generate the final ruleObj that is an aggregate of test function
 *      arrays for each input types.
 * @property {string} key       - name of the input that need to be verified
 * @property {boolean} required - whether the input is required
 * @property {string} typeof    - input value must be this type
 * @property {number} min       - min length if is string, min value if number
 * @property {number} max       - max length if is string, max value if number
 * @property {regex} regex      - if presents, the regex will be tested
 */
const rules = [
  {
    key: "username",
    required: true,
    type: "string",
    min: 3,
    max: 20,
    regex: null,
  },
  {
    key: "password",
    required: true,
    type: "string",
    min: 5,
    max: 20,
    regex: null,
  },
  {
    key: "email",
    required: true,
    type: "string",
    min: 5,
    max: 32,
    regex: /^.+@.+$/,
  },
  {
    key: "term",
    required: true,
    type: "boolean",
  },
];

const ruleObj = {};

for (const rule of rules) {
  let ruleList = [];
  let name = rule.key;
  if (rule.required) {
    ruleList.push(
      (v) => !!v || `${i18n.t(`form.${name}`)} ${i18n.t("verify.required")}`
    );
  }
  if (rule.min) {
    if (rule.type === "string") {
      ruleList.push(
        (v) =>
          (v && typeof v === "string" && v.length > rule.min) ||
          `${i18n.t(`form.${name}`)} ${i18n.t("verify.stringMin", {
            min: rule.min,
          })}`
      );
    } else if (rule.type === "number") {
      ruleList.push(
        (v) =>
          (v &&
            (v = Number.parseInt(v)) && typeof v === "number" && v > rule.min) ||
          `${i18n.t(`form.${name}`)} ${i18n.$t("verify.numberMin", {
            min: rule.min,
          })}`
      );
    }
  }
  if (rule.max) {
    if (rule.type === "string") {
      ruleList.push(
        (v) =>
          (v && typeof v === "string" && v.length < rule.max) ||
          `${i18n.t(`form.${name}`)} ${i18n.t("verify.stringMax", {
            max: rule.max,
          })}`
      );
    } else if (rule.type === "number") {
      ruleList.push(
        (v) =>
          (v &&
            (v = Number.parseInt(v)) && typeof v === "number" && v < rule.max) ||
          `${i18n.t(`form.${name}`)} ${i18n.t("verify.numberMax", {
            max: rule.max,
          })}`
      );
    }
  }
  if (rule.regex) {
    if (rule.type === "string") {
      ruleList.push(
        (v) =>
          (v && typeof v === "string" && rule.regex.test(v)) ||
          `${i18n.t(`form.${name}`)} ${i18n.t("verify.email")}`
      );
    }
  }
  const ruleObjName = "rule" + name.slice(0, 1).toUpperCase() + name.slice(1);
  ruleObj[ruleObjName] = ruleList;
}

export default ruleObj;