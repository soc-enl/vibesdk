/**
 * Frontend-only API surface for Pages deployment.
 * These types intentionally avoid any Worker runtime dependencies.
 */
import { RateLimitExceededError, SecurityError, SecurityErrorType } from '../shared/types/errors.js';

export { RateLimitExceededError, SecurityError, SecurityErrorType };

export type JsonObject = Record<string, unknown>;
export type ControllerResponse<T = JsonObject> = ApiResponse<T>;
export interface ApiResponse<T = JsonObject> {
	success: boolean;
	data?: T;
	error?: { message: string; type?: string };
}

export type SortOrder = 'asc' | 'desc';
export type TimePeriod = 'day' | 'week' | 'month' | 'year' | 'all';
export type AppSortOption = 'recent' | 'popular' | 'stars' | 'updated';
export type ViewMode = 'code' | 'preview' | 'presentation';
export type ModelSelectionMode = 'platform' | 'byok' | 'custom';
export type BehaviorType = 'agentic' | 'phasic';
export type ProjectType = 'app' | 'presentation' | 'general';
export type ReasoningEffort = 'low' | 'medium' | 'high';
export type ProviderOverride = Record<string, string>;
export type AgentActionKey = string;
export type OAuthProvider = 'google' | 'github' | 'email';
export type KdfAlgorithm = 'argon2id' | 'pbkdf2';

export interface FileType {
	filePath: string;
	fileContents: string;
	explanation?: string;
	isGenerating?: boolean;
	needsFixing?: boolean;
	hasErrors?: boolean;
	language?: string;
}

export interface GeneratedFile extends FileType {}
export interface GeneratedCodeFile extends FileType {}

export interface PaginationInfo {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface App {
	id: string;
	name: string;
	description?: string | null;
	createdAt?: string;
	updatedAt?: string;
	[key: string]: unknown;
}
export interface User {
	id: string;
	email?: string;
	name?: string | null;
	[key: string]: unknown;
}

export interface EnhancedAppData extends App {}
export interface AppWithFavoriteStatus extends App {
	isFavorited?: boolean;
}
export interface AppWithUserAndStats extends App {
	user?: User;
	stars?: number;
	views?: number;
}
export interface AppDetailsData extends AppWithUserAndStats {
	files?: FileType[];
}
export interface AppsListData {
	apps: AppWithFavoriteStatus[];
	pagination?: PaginationInfo;
}
export interface PublicAppsData extends AppsListData {}
export interface SingleAppData {
	app: AppDetailsData;
}
export interface FavoriteToggleData {
	isFavorited: boolean;
}
export interface FavoriteToggleResult extends FavoriteToggleData {}
export interface AppStarToggleData {
	starred: boolean;
}
export interface CreateAppData {
	app: App;
}
export interface UpdateAppVisibilityData {
	app: App;
}
export interface AppDeleteData {
	deleted: boolean;
}
export interface UserAppsData extends AppsListData {}
export interface ProfileUpdateData {
	user: User;
}
export interface UserStats {
	totalApps: number;
	totalStars: number;
	totalViews: number;
}
export type UserStatsData = UserStats;
export interface UserActivity {
	date: string;
	count: number;
}
export type UserActivityData = UserActivity[];
export interface UserAnalyticsResponseData {
	series: Array<Record<string, string | number>>;
}
export interface AgentAnalyticsResponseData {
	series: Array<Record<string, string | number>>;
}
export interface PlatformStatusData {
	status: 'ok' | 'degraded' | 'down';
	message?: string;
}
export interface CapabilitiesData {
	features: Record<string, { enabled: boolean }>;
	version?: string;
}

export interface FeatureCapabilities {
	enabled: boolean;
}
export interface ViewDefinition {
	id: string;
	label: string;
	enabled: boolean;
}
export interface FeatureDefinition {
	id: ProjectType;
	label: string;
	behaviorType: BehaviorType;
	views: ViewDefinition[];
}
export interface PlatformCapabilities {
	features: Record<string, FeatureCapabilities>;
	version: string;
}
export interface PlatformCapabilitiesConfig extends PlatformCapabilities {}

export const DEFAULT_FEATURE_DEFINITIONS: FeatureDefinition[] = [
	{ id: 'app', label: 'App', behaviorType: 'agentic', views: [] },
	{ id: 'presentation', label: 'Presentation', behaviorType: 'phasic', views: [] },
	{ id: 'general', label: 'General', behaviorType: 'agentic', views: [] },
];

export function getBehaviorTypeForProject(projectType: ProjectType): BehaviorType {
	if (projectType === 'presentation') {
		return 'phasic';
	}
	return 'agentic';
}

export interface ModelConfig {
	id?: string;
	modelName?: string | null;
	maxTokens?: number | null;
	temperature?: number | null;
	reasoningEffort?: ReasoningEffort | string | null;
	fallbackModel?: string | null;
	isUserOverride?: boolean;
	[key: string]: unknown;
}
export interface UserModelConfig extends ModelConfig {}
export interface UserModelProvider {
	id: string;
	provider: string;
	enabled?: boolean;
}
export interface UserModelConfigWithMetadata extends ModelConfig {
	displayName?: string;
}
export interface ModelTestResult {
	success: boolean;
	message?: string;
}
export interface ModelConfigsInfo {
	configs: ModelConfig[];
}
export interface ModelConfigsInfoMessage {
	type: string;
	data: ModelConfigsInfo;
}
export interface AgentDisplayConfig {
	provider?: string;
	model?: string;
}
export interface ModelConfigsData {
	configs: ModelConfig[];
}
export interface ModelConfigData {
	config: ModelConfig;
}
export interface ModelConfigUpdate {
	modelName?: string | null;
	maxTokens?: number | null;
	temperature?: number | null;
	reasoningEffort?: string | null;
	fallbackModel?: string | null;
	isUserOverride?: boolean;
}
export interface ModelConfigUpdateData {
	config: ModelConfig;
}
export interface ModelConfigTestData extends ModelTestResult {}
export interface ModelConfigResetData {
	config: ModelConfig;
}
export interface ModelConfigDefaultsData {
	configs: ModelConfig[];
}
export interface ModelConfigDeleteData {
	deleted: boolean;
}
export interface UserProviderStatus {
	provider: string;
	connected: boolean;
}
export type ModelsByProvider = Record<string, string[]>;
export interface ByokProvidersData {
	providers: UserProviderStatus[];
}
export interface ModelProviderData {
	id: string;
	name: string;
	[key: string]: unknown;
}
export interface ModelProvidersListData {
	providers: ModelProviderData[];
}
export interface CreateProviderRequest extends JsonObject {}
export interface UpdateProviderRequest extends JsonObject {}
export interface TestProviderRequest extends JsonObject {}
export interface ModelProviderCreateData {
	provider: ModelProviderData;
}
export interface ModelProviderUpdateData {
	provider: ModelProviderData;
}
export interface ModelProviderDeleteData {
	deleted: boolean;
}
export interface ModelProviderTestData extends ModelTestResult {}

export interface SecretTemplate {
	id: string;
	name: string;
	description?: string;
}
export interface SecretTemplatesData {
	templates: SecretTemplate[];
}
export interface SecretMetadata {
	id: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface VaultConfig {
	enabled: boolean;
	kdfAlgorithm?: KdfAlgorithm;
}
export interface VaultConfigResponse {
	config: VaultConfig;
}
export interface VaultStatusResponse {
	enabled: boolean;
	initialized: boolean;
}
export interface SetupVaultRequest {
	password: string;
}
export interface Argon2Params {
	timeCost: number;
	memoryCost: number;
	parallelism: number;
}

export interface BlueprintType {
	title?: string;
	description?: string;
	files?: GeneratedFile[];
	[key: string]: unknown;
}
export interface PhasicBlueprint extends BlueprintType {
	phases?: Array<Record<string, unknown>>;
}
export interface CodeReviewOutputType extends JsonObject {}
export interface FileConceptType extends JsonObject {}
export interface AgentState extends JsonObject {}
export interface PhasicState extends JsonObject {}
export interface ConversationMessage {
	id?: string;
	role: 'user' | 'assistant' | 'system' | string;
	content: string;
	createdAt?: string;
	[key: string]: unknown;
}
export interface RuntimeError {
	message: string;
	stack?: string;
}
export interface StaticAnalysisResponse {
	errors?: string[];
	warnings?: string[];
}
export interface AgentConfig extends JsonObject {}
export type AIModels = Record<string, string[]>;

export interface CodeFixEdits {
	filePath: string;
	edits: Array<{ start: number; end: number; replacement: string }>;
}
export interface WebSocketMessageData extends JsonObject {}
export interface WebSocketMessage {
	type: string;
	data?: WebSocketMessageData;
}
export interface AgentPreviewResponse {
	url?: string;
	status?: string;
}
export interface CodeGenArgs {
	query: string;
	projectType?: ProjectType;
}
export const MAX_AGENT_QUERY_LENGTH = 20000;

export interface RateLimitError {
	message: string;
	limitType?: string;
	limit?: number;
	period?: number;
	suggestions?: string[];
}
export interface RateLimitErrorResponse {
	error: RateLimitError;
}

export interface StreamingResponse {
	success: boolean;
	stream: Response;
}
export type AgentStreamingResponse = StreamingResponse;

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_IMAGES_PER_MESSAGE = 4;
export const SUPPORTED_IMAGE_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
] as const;
export type SupportedImageMimeType = typeof SUPPORTED_IMAGE_MIME_TYPES[number];
export interface ImageAttachment {
	id: string;
	mimeType: SupportedImageMimeType | string;
	fileName?: string;
	sizeBytes?: number;
	dataUrl: string;
}
export function isSupportedImageType(mimeType: string): mimeType is SupportedImageMimeType {
	return SUPPORTED_IMAGE_MIME_TYPES.includes(mimeType as SupportedImageMimeType);
}

export interface AuthSession {
	id: string;
	userId: string;
	expiresAt?: string;
}
export interface ApiKeyInfo {
	id: string;
	name: string;
	keyPreview: string;
}
export interface AuthUser {
	id: string;
	email?: string;
	name?: string | null;
	avatarUrl?: string | null;
}
export interface AuthResult {
	user: AuthUser | null;
	session?: AuthSession | null;
}
export interface SessionResponse {
	user: AuthUser;
	sessionId: string;
}
export type LoginResponseData = SessionResponse;
export type RegisterResponseData = SessionResponse & {
	requiresVerification?: boolean;
};
export interface ProfileResponseData {
	user: AuthUser;
	sessionId: string;
}
export interface AuthProvidersResponseData {
	providers: {
		google: boolean;
		github: boolean;
		email: boolean;
	};
	hasOAuth: boolean;
	requiresEmailAuth: boolean;
	csrfToken?: string;
	csrfExpiresIn?: number;
}
export interface CsrfTokenResponseData {
	token: string;
	headerName: string;
	expiresIn?: number;
}
export interface ActiveSessionsData {
	sessions: Array<{
		id: string;
		userAgent: string | null;
		ipAddress: string | null;
		lastActivity: Date;
		createdAt: Date;
		isCurrent: boolean;
	}>;
}
export interface ApiKeysData {
	keys: Array<{
		id: string;
		name: string;
		keyPreview: string;
		createdAt: Date | null;
		lastUsed: Date | null;
		isActive: boolean;
	}>;
}

export interface TemplateDetails {
	name: string;
	description?: string;
}
export interface AppQueryOptions extends JsonObject {}
export interface PublicAppQueryOptions extends JsonObject {}
export interface AgentConnectionData extends JsonObject {}
export interface GitCloneTokenData {
	token: string;
	expiresAt?: string;
}
export interface GitHubExportOptions extends JsonObject {}
export interface GitHubExportResult extends JsonObject {}
