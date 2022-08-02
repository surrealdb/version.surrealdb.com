const REGIONS = {
	// Cape Town
	'af-south-1': [/* Africa */ 'AO','BF','BI','BJ','BW','CD','CF','CG','CI','CM','CV','DJ','DZ','ER','ET','GA','GH','GM','GN','GQ','GW','KE','KM','LR','LS','LY','MA','MG','ML','MR','MU','MW','MZ','NA','NE','NG','RE','RW','SC','SD','SH','SL','SN','SO','SS','ST','SZ','TD','TG','TN','TZ','UG','YT','ZA','ZM','ZW'],
	// Hong Kong
	'ap-east-1': ['HK', /* Asia */ 'CN', 'JP', 'KH', 'LA', 'MN', 'MO', 'PH', 'TW', 'VN', /* Korea */ 'KP', 'KR'],
	// Mumbai
	'ap-south-1': [/* India */ 'IN', /* Indian Ocean */ 'IO', /* Sri Lanka */ 'LK', /* Maldives */ 'MV', /* Near India */ 'AF','BD','BT','KG','KZ','NP','PK','TJ'],
	// Singapore
	'ap-southeast-1': [/* Brunei */ 'BN', /* Cocos Islands */ 'CC', /* Indonesia */ 'ID', /* Myanmar */ 'MM', /*Malaysia */ 'MY', /* Singapore */ 'SG', /* Thailand */ 'TH'],
	// Sydney
	'ap-southeast-2': [/* Oceania */ 'AS','AU','CK','FJ','FM','GU','KI','MH','MP','NC','NF','NR','NU','NZ','PF','PG','PN','PW','SB','TK','TL','TO','TV','UM','VU','WF','WS', /* Antarctica */ 'AQ', 'GS', 'TF'],
	// Canada
	'ca-central-1': [/* Canada */ 'CA', /*Greenland */ 'GL'],
	// Frankfurt
	'eu-central-1': [/* Europe */ 'AD','AL','AT','AX','BA','BE','BG','BY','CH','CY','CZ','DE','DK','EE','ES','FI','FO','FR','GG','GI','GR','HR','HU','IM','IS','IT','JE','LI','LT','LU','LV','MC','MD','ME','MK','MT','NL','NO','PL','PT','RO','RS','RU','SE','SI','SJ','SK','SM','TR','UA','VA','XK'],
	// London
	'eu-west-2': [/* United Kingdom */ 'GB', /* Ireland */ 'IE'],
	// Bahrain
	'me-south-1': [/* Egypt */ 'EG', /* Middle East */ 'AE','AM','AZ','BH','GE','IL','IQ','IR','JO','KW','LB','OM','PS','QA','SA','SY','TM','UZ','YE'],
	// Sāo Paulo
	'sa-east-1': [/* South America */ 'AR','BO','BR','CL','CO','EC','FK','GF','GY','PE','PY','SR','UY','VE'],
	// Oregon
	'us-west-2': [/* North and Central America */ 'AG','AI','AW','BB','BL','BM','BQ','BS','BZ','CR','CU','CW','DM','DO','GD','GP','GT','HN','HT','JM','KN','KY','LC','MF','MQ','MS','MX','NI','PA','PM','PR','SV','SX','TC','TT','US','VC','VG','VI'],
};

const location = (code) => {
	
	for (const region in REGIONS) {
		if ( REGIONS[region].includes(code) ) {
			return region;
		}
	}
	
};

exports.main = async (event) => {

	const request = event.Records[0].cf.request;
	
	if (request.headers['cloudfront-viewer-country']) {
		
		const code = request.headers['cloudfront-viewer-country'][0].value;
		
		let region = location(code);
		
		if (region) {
			
			let domain = `download.${region}.surrealdb.com.s3.${region}.amazonaws.com`;

			request.uri = '/latest.txt';
			request.origin.s3.region = region;
			request.origin.s3.domainName = domain;
			
			request.headers['host'] = [{
				key: 'host',
				value: domain,
			}];
			
		}

	}
	
	return request;

};
