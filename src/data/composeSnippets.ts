export const COMPOSE_SNIPPETS: Record<string, { title: string; code: string }> = {
  onboarding: {
    title: 'OnboardingScreen.kt',
    code: `@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(
    onNavigateToSignUp: () -> Unit,
    onNavigateToLogin: () -> Unit
) {
    val pagerState = rememberPagerState(pageCount = { 3 })
    val coroutineScope = rememberCoroutineScope()

    Scaffold(
        containerColor = MaterialTheme.colorScheme.surface
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            HorizontalPager(
                state = pagerState,
                modifier = Modifier.weight(1f)
            ) { page ->
                OnboardingPageContent(page = page)
            }

            // MD3 Dot Indicators
            Row(
                modifier = Modifier.padding(16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                repeat(3) { index ->
                    val isSelected = pagerState.currentPage == index
                    Box(
                        modifier = Modifier
                            .height(8.dp)
                            .width(if (isSelected) 24.dp else 8.dp)
                            .clip(CircleShape)
                            .background(
                                if (isSelected) MaterialTheme.colorScheme.primary
                                else MaterialTheme.colorScheme.surfaceVariant
                            )
                    )
                }
            }

            // CTAs
            Button(
                onClick = onNavigateToSignUp,
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary
                )
            ) {
                Text("Get Started · Join Community", style = MaterialTheme.typography.labelLarge)
            }
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedButton(
                onClick = onNavigateToLogin,
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = RoundedCornerShape(16.dp)
            ) {
                Text("I already have an account", color = MaterialTheme.colorScheme.onSurface)
            }
        }
    }
}`
  },
  signup: {
    title: 'SignUpScreen.kt',
    code: `@Composable
fun SignUpScreen(
    onSignUpSuccess: () -> Unit,
    onNavigateToLogin: () -> Unit
) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Create Account") },
                navigationIcon = {
                    IconButton(onClick = onNavigateToLogin) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 24.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                "Welcome to skillswapr",
                style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold)
            )
            Text(
                "Exchange what you know, get what you need without money. 1 hour of help = 1 time credit.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            OutlinedButton(
                onClick = { /* Google OAuth Intent */ },
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = RoundedCornerShape(14.dp)
            ) {
                Icon(painterResource(R.drawable.ic_google), contentDescription = null)
                Spacer(Modifier.width(8.dp))
                Text("Continue with Google")
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                HorizontalDivider(Modifier.weight(1f))
                Text("  or email  ", style = MaterialTheme.typography.labelMedium)
                HorizontalDivider(Modifier.weight(1f))
            }

            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text("Full Name") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp)
            )
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                label = { Text("Email Address") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp)
            )
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Password") },
                visualTransformation = PasswordVisualTransformation(),
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp)
            )

            Button(
                onClick = onSignUpSuccess,
                modifier = Modifier.fillMaxWidth().height(52.dp),
                shape = RoundedCornerShape(14.dp)
            ) {
                Text("Continue to Profile Setup")
            }
        }
    }
}`
  },
  login: {
    title: 'LoginScreen.kt',
    code: `@Composable
fun LoginScreen(
    onLoginSuccess: () -> Unit,
    onNavigateToSignUp: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Scaffold { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(24.dp)
        ) {
            Text("Sign In to skillswapr", style = MaterialTheme.typography.headlineMedium)
            // Google Sign In + Email fields + Forgot Password link
        }
    }
}`
  },
  profile_setup: {
    title: 'ProfileSetupScreen.kt',
    code: `@Composable
fun ProfileSetupScreen(onFinishSetup: () -> Unit) {
    var locationGranted by remember { mutableStateOf(false) }
    var firstSkill by remember { mutableStateOf("") }
    // Handles Android location permission prompt + avatar upload + first skill offered
}`
  },
  home: {
    title: 'HomeScreen.kt',
    code: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    creditBalance: Float,
    listings: List<SkillListing>,
    onListingClick: (SkillListing) -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("skillswapr", style = MaterialTheme.typography.titleLarge)
                        Text("Mission District · 1.3 km radius", style = MaterialTheme.typography.bodySmall)
                    }
                },
                actions = {
                    // Time credit balance wallet pill
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = MaterialTheme.colorScheme.primaryContainer,
                        modifier = Modifier.padding(end = 12.dp)
                    ) {
                        Row(Modifier.padding(horizontal = 10.dp, vertical = 6.dp)) {
                            Icon(Icons.Default.Schedule, contentDescription = null)
                            Text("$creditBalance hrs", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(listings) { listing ->
                SkillListingCard(listing = listing, onClick = { onListingClick(listing) })
            }
        }
    }
}`
  },
  browse: {
    title: 'BrowseScreen.kt',
    code: `@Composable
fun BrowseScreen(
    searchQuery: String,
    selectedCategory: String?,
    onCategorySelect: (String?) -> Unit
) {
    // Horizontal scrollable FilterChips + SearchBar + Distance / Rating filter row + Grid results
}`
  },
  listing_detail: {
    title: 'ListingDetailScreen.kt',
    code: `@Composable
fun ListingDetailScreen(
    listing: SkillListing,
    onBack: () -> Unit,
    onRequestSkill: () -> Unit
) {
    // Large Hero Header + Poster Info + Description + Tools Provided + Bottom Sticky Bar with 1 credit/hr rate
}`
  },
  message_thread: {
    title: 'RequestChatScreen.kt',
    code: `@Composable
fun RequestChatScreen(
    thread: RequestThread,
    onAccept: () -> Unit,
    onDecline: () -> Unit,
    onSendMessage: (String) -> Unit
) {
    // Pending request banner with Accept/Decline button + LazyColumn of bubbles + Message input bar
}`
  },
  profile: {
    title: 'ProfileScreen.kt',
    code: `@Composable
fun ProfileScreen(
    user: UserProfile,
    onEditProfile: () -> Unit
) {
    // Header with avatar & star rating + Time-Credit Wallet Card + Tabs (Offered / Wanted) + Reviews
}`
  },
  create_listing: {
    title: 'CreateListingScreen.kt',
    code: `@Composable
fun CreateListingScreen(
    onDismiss: () -> Unit,
    onPublish: (SkillListing) -> Unit
) {
    // SingleChoiceSegmentedButtonRow (Offer vs Request) + Title + Category + Hours/Credits slider + Post CTA
}`
  }
};
