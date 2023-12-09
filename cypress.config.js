const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://stagtest.success.app',
  },
  env :{
    local: 'https://acmeinc.success.test',
    staging: 'https://stagtest.success.app',
    sandbox: 'https://sandtest.success.app',
    production: 'https://prodtest.success.app'

  },
  component:{
    success_auth: 'eyJpdiI6ImN5RUE2ckI1ZFdMSVBJMHRZTnhXS2c9PSIsInZhbHVlIjoiQ2I3MmRTdi9RRVpPdGIvQk9mNFBxakF0UGk0Y1VqUDd0aEt3UldxelI3OTNiRGpIQ3ZWQWFOVnlmemh1Zzk5WmoyVGl1WFRaeU13dFBrN0Zwd2xxOEp1UVdMLzZzazY3Rk9GdUR0ZkduS2M9IiwibWFjIjoiODFjZGQ3MDhjNmQ3ZGRjYTQwMWQwNDU2YzVkZmRjMjQyYjJiZjM4YjdiMmJkMDA4NTIwMmViOWZlZjg0MTk3MiIsInRhZyI6IiJ9',
  },
  
});
