//Purpose of this is to work on metadata and extract necessary details out of it.

 import ProfileMeta from "../metadata/ProfileMeta.json";

export const fieldNormalizer = () => {
  const sections = Object.keys(ProfileMeta);
  const fieldIndex = {};
  sections.map((sectionKey, sectionIdx) => {
    fieldIndex[sectionKey] = {};
    console.log(ProfileMeta[sectionKey].children);
    Object.keys(ProfileMeta[sectionKey].children).map((fieldKey, fieldIdx) => {
      let field = ProfileMeta[sectionKey].children[fieldKey].name;

      fieldIndex[sectionKey][field] = fieldKey;
    });
  });
  return fieldIndex;
};
