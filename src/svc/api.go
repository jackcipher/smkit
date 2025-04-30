package svc

import (
	"fmt"
	"net/http"
	"net/url"

	"resty.dev/v3"
)

type SMApi interface {
	Me() (*RespUserMe, error)
}

type ImplSMApi struct {
	host string
	sid  string
	cli  *resty.Client
}

func NewSMApi(host string, sid string) SMApi {
	c := &ImplSMApi{host: host, sid: sid}
	c.cli = resty.New().SetCookies([]*http.Cookie{
		{Name: "shimo_sid", Value: sid},
		{Name: "shimo_dev_sid", Value: sid},
	}).
		SetHeader("X-Requested-With", "SOS 2.0").
		SetHeader("Referer", "https://shimo.im/").
		SetDebug(true)

	return c
}

func (c *ImplSMApi) U(path string) string {
	s, _ := url.JoinPath(c.host, path)
	return s
}

type RespUserMe struct {
	ID                           int    `json:"id"`
	Name                         string `json:"name"`
	Email                        string `json:"email"`
	Avatar                       string `json:"avatar"`
	Status                       int    `json:"status"`
	TeamRole                     string `json:"teamRole"`
	Mobile                       string `json:"mobile"`
	RequiresIdentityVerification bool   `json:"requiresIdentityVerification"`
}

type RespUserMeError struct {
	RequestID string `json:"requestId"`
	Error     string `json:"error"`
	ErrorCode int    `json:"errorCode"`
}

func (c *ImplSMApi) Me() (*RespUserMe, error) {
	var me RespUserMe
	var meErr RespUserMeError
	resp, err := c.cli.R().SetResult(&me).SetError(&meErr).Get(c.U("/lizard-api/users/me"))
	if resp != nil {
		fmt.Printf("respCode: %d\t raw:%s", resp.StatusCode(), resp.String())
	}
	if err != nil {
		return nil, fmt.Errorf("请求失败: %w", err)
	}
	if meErr.ErrorCode != 0 {
		return nil, fmt.Errorf("errorCode: %d %s", meErr.ErrorCode, meErr.Error)
	}
	if resp, err := c.cli.SetRedirectPolicy(resty.NoRedirectPolicy()).R().SetDoNotParseResponse(true).Get(me.Avatar); err == nil {
		location := resp.Header().Get("Location")
		me.Avatar = location
	}
	return &me, nil
}
