from fastapi import FastAPI
from app.middleware.error_handler import add_exception_handlers
from app.routes import (
    user_routes,
    task_routes,
    mentor_routes,
    hr_routes,
    pseb_routes,
    meeting_routes,
)
from app.seeder.seed import seed
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.rate_limiter import RateLimitMiddleware
from app.middleware.logging_middleware import LoggingMiddleware
from app.middleware.auth_middleware import AuthTokenMiddleware

def init_app():
    app = FastAPI(title="SkillTrackPro")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    add_exception_handlers(app)
    app.add_middleware(LoggingMiddleware)
    app.add_middleware(RateLimitMiddleware)
    app.add_middleware(AuthTokenMiddleware)

    # Seeder on startup
    @app.on_event("startup")
    def start_app():
        seed()

    # Routers
    app.include_router(user_routes.router)
    app.include_router(task_routes.router)
    app.include_router(mentor_routes.router)
    app.include_router(hr_routes.router)
    app.include_router(pseb_routes.router)
    app.include_router(meeting_routes.router)

    return app
