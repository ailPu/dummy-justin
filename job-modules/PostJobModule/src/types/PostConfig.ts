/**
 * @moduleConfig
 */
export interface IPostSourceConfig {
	company: string;
	apiEndpointJobList: string;
	region: string;

	/**
	 * if set, only publishes jobs with given source ids
	 *
	 * (if set, this is the only filter that is applied! not to be combined with the others.)
	 */
	filterSourceIds?: string[];

	/**
	 * if set, only publishes jobs with given category >> in job.department
	 *
	 * (multiple filters are combined with AND to satisfy each.)
	 */
	filterCategories?: string[];

	/**
	 * if set, only publishes jobs with the given titles (matching with "includes"!)
	 *
	 * (multiple filters are combined with AND to satisfy each.)
	 */
	includedJobTitles?: string[];

	privacyTermsTitle?: string;
	privacyTemplate?: string;
}

