import i18n from "@/locale";

const rules = [
  {
    key: "username",
    required: true,
    type: "string",
    min: 4,
    max: 20,
    regex: null,
  }, {
    key: "password",
    required: true,
    type: "string",
    min: 6,
    max: 20,
    regex: null,
  }
];

const ruleObj = {};

for (const rule of rules) {
  let ruleList = [];
  let name = rule.key;
  if (rule.required) {
    ruleList.push(v => !!v || `${i18n.t(`form.${name}`)} ${i18n.t('verify.required')}`);
  }
  if (rule.min) {
    if (rule.type === "string") {
      ruleList.push(v => (v && v.length > rule.min) || `${i18n.t(`form.${name}`)} ${i18n.t('verify.stringMin', { min: rule.min })}`);
    } else if (rule.type === "number") {
      ruleList.push(v => (v && v > rule.min) || `${i18n.t(`form.${name}`)} ${i18n.$t('verify.numberMin', { min: rule.min })}`);
    }
  }
  if (rule.max) {
    if (rule.type === "string") {
      ruleList.push(v => (v && v.length < rule.max) || `${i18n.t(`form.${name}`)} ${i18n.t('verify.stringMax', { max: rule.max })}`);
    } else if (rule.type === "number") {
      ruleList.push(v => (v && v < rule.max) || `${i18n.t(`form.${name}`)} ${i18n.t('verify.numberMax', { max: rule.max })}`);
    }
  }
  const ruleObjName = "rule" + name.slice(0,1).toUpperCase() + name.slice(1);
  ruleObj[ruleObjName] = ruleList;
}

export default ruleObj;